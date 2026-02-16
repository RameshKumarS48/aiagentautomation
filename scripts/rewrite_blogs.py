#!/usr/bin/env python3
"""
Rewrite all existing blogs with the new SEO-optimised structure.
Handles rate limits with retries and processes in small batches.
Tracks progress to resume from where it left off.
"""

import os
import re
import sys
import json
import time
import random
from pathlib import Path
from datetime import datetime

try:
    import frontmatter
except ImportError:
    os.system('pip install python-frontmatter')
    import frontmatter

try:
    from groq import Groq
    HAS_GROQ = True
except ImportError:
    HAS_GROQ = False

try:
    import google.generativeai as genai
    HAS_GEMINI = True
except ImportError:
    HAS_GEMINI = False

try:
    from openai import OpenAI
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False


def get_rewrite_prompt(title: str, topic: str, category: str, tags: list,
                       sample_agents: list, sample_blogs: list) -> str:
    """Generate the SEO-optimised rewrite prompt."""
    
    agents_str = ', '.join(sample_agents[:10]) if sample_agents else 'None'
    blogs_str = ', '.join(sample_blogs[:8]) if sample_blogs else 'None'
    tags_str = ', '.join(tags) if tags else category

    return f"""You are an expert SEO content writer.

Your task is to generate a high-quality, human-like, SEO-optimised blog post based on the inputs provided.

Follow all instructions strictly.

---

INPUTS:
Primary keyword: {topic}
Secondary keywords: {tags_str}
Search intent: informational
Target audience: Developers, tech professionals, and business leaders
Word count target: 2000-2500
Tone: Confident, informative, conversational
Language: British English

---

AVAILABLE FOR LINKING:
- Agent pages (link format: [Agent Name](/agents/slug/)): {agents_str}
- Other blog posts (link format: [Post Title](/blog/slug/)): {blogs_str}

---

GLOBAL WRITING RULES:

1. Write in clear, natural, human-like language.
2. Avoid AI clichés, fluff, and generic phrases.
3. Do not use phrases like:
   - "In today's fast-paced world"
   - "Unlock the power of"
   - "Game-changer"
   - "Cutting-edge"
   - "In conclusion"
   - "To sum up"
   - "As we've seen"
   - "It's worth noting"
   - "It goes without saying"
   - "Leverage"
   - "Seamless"
   - "Revolutionary"
   - "Robust"
4. Use short paragraphs (2-3 lines max).
5. Use bullet points where helpful.
6. Keep sentences varied in length.
7. Maintain a confident, informative tone.
8. Do not mention SEO, keywords, or optimisation in the output.
9. Do not repeat the same idea in multiple sections.
10. Ensure the content is factually correct and useful.
11. Use "you" to address the reader directly.
12. Include specific numbers, tools, and real examples.

---

SEO REQUIREMENTS:

- Include the primary keyword in:
  - The title
  - The first 100 words
  - At least one H2
- Naturally incorporate secondary keywords.
- Keep the title under 60 characters.
- Write a meta description between 140-160 characters.

---

INTERNAL LINKING REQUIREMENTS:
- Include minimum 5 links to agent pages (/agents/slug/)
- Include minimum 3 links to other blog posts (/blog/slug/)
- Links must be contextually relevant
- Anchor text should be descriptive, not "click here"

EXTERNAL LINKING REQUIREMENTS:
- Include 2-3 links to authoritative external sources
- Good sources: OpenAI docs, Anthropic docs, Google AI blog, arXiv, GitHub repos, MIT Technology Review
- External links should add genuine value

---

OUTPUT STRUCTURE (follow this EXACTLY):

1) Title (H1)
- SEO-optimised, under 60 characters
- Clear benefit-driven headline

2) Meta Description
- 140-160 characters
- Includes primary keyword

3) Introduction (100-150 words)
- Start with the problem or question
- Acknowledge reader intent
- Briefly explain what they'll learn
- Include primary keyword in first 100 words

4) Quick Answer / TL;DR
- H2: Quick Answer
- 3-5 bullet points summarising the key answer
- Keep each bullet to 1-2 sentences

5) Main Sections

H2: [Core topic section with primary keyword]
- Deep explanation with real-world examples
- Bullets where appropriate
- Link to 2 relevant agent pages

H2: [Secondary topic section]
- Practical insights and applications
- Step-by-step instructions where relevant
- Link to 1-2 blog posts

H2: [Step-by-step guide / comparison / breakdown]
- Use H3s for sub-points
- Numbered steps or actionable checklist
- Link to 2-3 agent pages

6) Real-World Examples
H2: Real-World Applications
- 2-3 specific, practical scenarios
- Make the content credible and useful
- Link to relevant agent pages

7) Frequently Asked Questions

H2: Frequently Asked Questions

H3: [Question 1]
- 40-60 word answer

H3: [Question 2]
- 40-60 word answer

H3: [Question 3]
- 40-60 word answer

H3: [Question 4]
- 40-60 word answer

8) Key Takeaways
H2: Key Takeaways
- Short summary in 3-5 bullet points
- Actionable closing insight
- Link to [browse all agents](/agents/)
- Link to 1-2 related blog posts for further reading

---

OUTPUT FORMAT - Return ONLY this JSON:

{{
  "title": "string - under 60 chars",
  "slug": "string - URL-friendly slug",
  "excerpt": "string - 140-160 chars meta description",
  "tags": ["5-6 relevant tags"],
  "content": "string - full markdown content with proper line breaks",
  "read_time": number (10-15),
  "related_agents": ["5 agent slugs used in content"],
  "related_posts": ["3 blog slugs used in content"],
  "featured": boolean
}}

---

CRITICAL FORMATTING RULES:
- Content must have proper markdown line breaks (actual newlines, not \\\\n)
- Each paragraph should be separated by blank lines
- HEADERS MUST BE ON A SINGLE LINE - never split a header across lines
- After a header, always put a blank line, then the paragraph text
- Headers should be short (3-6 words)
- Keep paragraphs to 2-3 lines maximum
- Use * for bullet points, not -

Only output the final JSON. Do not include explanations, notes, or metadata.

Return ONLY valid JSON."""


def escape_yaml(text: str) -> str:
    """Escape text for YAML."""
    if not text:
        return ""
    return text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')


def call_api_with_retry(prompt: str, groq_client=None, gemini_model=None, openai_client=None, max_retries=3) -> dict:
    """Call AI API with retry logic and exponential backoff."""
    
    apis = []
    if groq_client:
        apis.append(('groq', groq_client))
    if gemini_model:
        apis.append(('gemini', gemini_model))
    if openai_client:
        apis.append(('openai', openai_client))
    
    for attempt in range(max_retries):
        for api_name, client in apis:
            try:
                if api_name == 'groq':
                    response = client.chat.completions.create(
                        model="llama-3.3-70b-versatile",
                        max_tokens=8000,
                        messages=[{"role": "user", "content": prompt}]
                    )
                    text = response.choices[0].message.content
                    
                elif api_name == 'gemini':
                    response = client.generate_content(prompt)
                    text = response.text
                    
                elif api_name == 'openai':
                    response = client.chat.completions.create(
                        model="gpt-4o-mini",
                        max_tokens=8000,
                        messages=[{"role": "user", "content": prompt}]
                    )
                    text = response.choices[0].message.content
                
                # Parse JSON
                json_match = re.search(r'\{[\s\S]*\}', text)
                if json_match:
                    try:
                        data = json.loads(json_match.group())
                        if data.get('content') and len(data['content']) > 500:
                            return data
                    except json.JSONDecodeError:
                        cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_match.group())
                        try:
                            data = json.loads(cleaned)
                            if data.get('content') and len(data['content']) > 500:
                                return data
                        except:
                            pass
                
            except Exception as e:
                error_str = str(e)
                if '429' in error_str or 'rate_limit' in error_str or 'quota' in error_str:
                    # Extract wait time if available
                    wait_match = re.search(r'(\d+)m(\d+)', error_str)
                    if wait_match:
                        wait_mins = int(wait_match.group(1))
                        wait_secs = int(wait_match.group(2))
                        total_wait = min(wait_mins * 60 + wait_secs + 5, 120)  # Cap at 2 minutes
                        print(f"    Rate limited on {api_name}, waiting {total_wait}s...")
                        time.sleep(total_wait)
                    else:
                        wait = min(30 * (2 ** attempt), 120)
                        print(f"    Rate limited on {api_name}, waiting {wait}s...")
                        time.sleep(wait)
                    continue
                else:
                    print(f"    {api_name} error: {str(e)[:100]}")
                    time.sleep(2)
                    continue
        
        # Between retries
        if attempt < max_retries - 1:
            backoff = 15 * (attempt + 1)
            print(f"    Retry {attempt + 2}/{max_retries} in {backoff}s...")
            time.sleep(backoff)
    
    return None


def fix_split_headers(content: str) -> str:
    """Fix any split headers in generated content."""
    content = re.sub(
        r'^(#{1,4}\s+\S+(?:\s+\S+){0,3})\s*\n\n([A-Z][^\n]+)',
        lambda m: f"{m.group(1)} {m.group(2)}",
        content,
        flags=re.MULTILINE
    )
    return content


def has_new_structure(content: str) -> bool:
    """Check if a blog already has the new structure (TL;DR + FAQ)."""
    body = content.split('---', 2)[-1] if '---' in content else content
    has_tldr = bool(re.search(r'^##\s*(Quick Answer|TL;DR)', body, re.MULTILINE | re.IGNORECASE))
    has_faq = bool(re.search(r'^##\s*Frequently Asked Questions', body, re.MULTILINE | re.IGNORECASE))
    return has_tldr and has_faq


def main():
    project_root = Path(__file__).parent.parent
    blogs_dir = project_root / "src" / "content" / "blogs"
    agents_dir = project_root / "src" / "content" / "agents"
    
    # Get agent and blog slugs for linking
    agent_slugs = [f.stem for f in agents_dir.glob("*.md")] if agents_dir.exists() else []
    blog_slugs = [f.stem for f in blogs_dir.glob("*.md")] if blogs_dir.exists() else []
    
    print(f"Found {len(agent_slugs)} agents, {len(blog_slugs)} blogs")
    
    # Setup API clients
    groq_key = os.environ.get("GROQ_API_KEY")
    gemini_key = os.environ.get("GEMINI_API_KEY")
    openai_key = os.environ.get("OPENAI_API_KEY")
    
    groq_client = Groq(api_key=groq_key) if HAS_GROQ and groq_key else None
    openai_client = OpenAI(api_key=openai_key) if HAS_OPENAI and openai_key else None
    gemini_model = None
    if HAS_GEMINI and gemini_key:
        genai.configure(api_key=gemini_key)
        gemini_model = genai.GenerativeModel('gemini-2.0-flash')
    
    apis = []
    if groq_client: apis.append("Groq")
    if gemini_model: apis.append("Gemini")
    if openai_client: apis.append("OpenAI")
    
    if not apis:
        print("No API available. Set GROQ_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY")
        return
    
    print(f"Available APIs: {', '.join(apis)}")
    
    # Get all blog files, skip already-rewritten ones
    blog_files = sorted(blogs_dir.glob("*.md"))
    
    to_rewrite = []
    already_done = 0
    for f in blog_files:
        content = f.read_text()
        if has_new_structure(content):
            already_done += 1
        else:
            to_rewrite.append(f)
    
    total = len(to_rewrite)
    print(f"\nAlready rewritten: {already_done}")
    print(f"Need to rewrite: {total}")
    
    if total == 0:
        print("All blogs already have the new structure!")
        return
    
    print(f"\nRewriting {total} blogs with new SEO structure...\n")
    
    success = 0
    failed = 0
    batch_size = 5
    
    for i, blog_file in enumerate(to_rewrite):
        try:
            post = frontmatter.load(blog_file)
        except Exception as e:
            print(f"[{i+1}/{total}] Error reading {blog_file.name}: {e}")
            failed += 1
            continue
        
        title = post.get('title', blog_file.stem.replace('-', ' ').title())
        category = post.get('category', 'AI Agents')
        tags = post.get('tags', [])
        image = post.get('image', '')
        image_alt = post.get('image_alt', '')
        slug = blog_file.stem
        
        # Use title as topic
        topic = title.strip('"').strip("'")
        
        print(f"[{i+1}/{total}] Rewriting: {topic}")
        
        # Sample agents and blogs for linking
        sample_agents = random.sample(agent_slugs, min(15, len(agent_slugs))) if agent_slugs else []
        other_blogs = [b for b in blog_slugs if b != slug]
        sample_blogs = random.sample(other_blogs, min(10, len(other_blogs))) if other_blogs else []
        
        prompt = get_rewrite_prompt(topic, topic, category, tags, sample_agents, sample_blogs)
        
        data = call_api_with_retry(
            prompt,
            groq_client=groq_client,
            gemini_model=gemini_model,
            openai_client=openai_client,
            max_retries=3
        )
        
        if not data:
            print(f"  ✗ Failed after retries")
            failed += 1
            continue
        
        # Fix any split headers
        content = fix_split_headers(data.get('content', ''))
        
        # Build new frontmatter
        new_title = escape_yaml(data.get('title', topic))
        new_excerpt = escape_yaml(data.get('excerpt', ''))
        new_tags = data.get('tags', tags)
        read_time = data.get('read_time', 12)
        related_agents = data.get('related_agents', [])
        related_posts = data.get('related_posts', [])
        featured = data.get('featured', False)
        date_str = datetime.now().strftime('%Y-%m-%d')
        
        def yaml_list(items):
            if not items:
                return '  - ""'
            return '\n'.join(f'  - "{escape_yaml(str(item))}"' for item in items if item)
        
        new_content = f'''---
title: "{new_title}"
excerpt: "{new_excerpt}"
category: "{category}"
tags:
{yaml_list(new_tags)}
author: "AI Agents Team"
image: "{image}"
image_alt: "{escape_yaml(image_alt)}"
published_date: {date_str}
read_time: {read_time}
featured: {str(featured).lower()}
related_agents:
{yaml_list(related_agents)}
related_posts:
{yaml_list(related_posts)}
---

{content}
'''
        
        blog_file.write_text(new_content)
        print(f"  ✓ Rewritten successfully")
        success += 1
        
        # Rate limiting between requests
        time.sleep(3)
        
        # Extra pause between batches
        if (i + 1) % batch_size == 0 and i + 1 < total:
            print(f"\n  --- Batch pause ({success}/{total} done, waiting 15s) ---\n")
            time.sleep(15)
    
    print(f"\n{'='*60}")
    print(f"Blog rewrite complete!")
    print(f"  Success: {success}/{total}")
    print(f"  Failed: {failed}/{total}")
    print(f"  Previously done: {already_done}")
    print(f"  Total blogs: {len(list(blogs_dir.glob('*.md')))}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
