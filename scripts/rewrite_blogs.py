#!/usr/bin/env python3
"""
Rewrite all existing blogs with the new SEO-optimised structure.
Uses existing topic/title from each blog and regenerates content
with the new structure: TL;DR, FAQ, British English, etc.
"""

import os
import re
import sys
import json
import time
import random
from pathlib import Path
from datetime import datetime

# Add parent scraper dir to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'scraper'))

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
- Link to: official documentation, research papers, industry blogs
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
- Images should be on their own lines
- HEADERS MUST BE ON A SINGLE LINE - never split a header across lines
- After a header, always put a blank line, then the paragraph text
- Headers should be short (3-6 words)
- Keep paragraphs to 2-3 lines maximum
- Use * for bullet points, not -

---

QUALITY CHECK BEFORE OUTPUT:
- Does the introduction match the search intent?
- Is the primary keyword used naturally?
- Are paragraphs short and readable (2-3 lines)?
- Is the tone human and not robotic?
- Is the structure followed exactly?
- Are there at least 5 agent links and 3 blog links?
- Is there a TL;DR section with bullet points?
- Is there an FAQ section with 4 H3 questions?

Only output the final JSON. Do not include explanations, notes, or metadata.

Return ONLY valid JSON."""


def escape_yaml(text: str) -> str:
    """Escape text for YAML."""
    if not text:
        return ""
    return text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')


def rewrite_with_groq(prompt: str, client) -> dict:
    """Rewrite using Groq API."""
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            max_tokens=8000,
            messages=[{"role": "user", "content": prompt}]
        )
        text = response.choices[0].message.content
        json_match = re.search(r'\{[\s\S]*\}', text)
        if json_match:
            return json.loads(json_match.group())
    except json.JSONDecodeError:
        try:
            cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_match.group())
            return json.loads(cleaned)
        except:
            pass
    except Exception as e:
        print(f"  Groq error: {e}")
    return None


def rewrite_with_gemini(prompt: str, model) -> dict:
    """Rewrite using Gemini API."""
    try:
        response = model.generate_content(prompt)
        text = response.text
        json_match = re.search(r'\{[\s\S]*\}', text)
        if json_match:
            return json.loads(json_match.group())
    except json.JSONDecodeError:
        try:
            cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_match.group())
            return json.loads(cleaned)
        except:
            pass
    except Exception as e:
        print(f"  Gemini error: {e}")
    return None


def rewrite_with_openai(prompt: str, client) -> dict:
    """Rewrite using OpenAI API."""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            max_tokens=8000,
            messages=[{"role": "user", "content": prompt}]
        )
        text = response.choices[0].message.content
        json_match = re.search(r'\{[\s\S]*\}', text)
        if json_match:
            return json.loads(json_match.group())
    except json.JSONDecodeError:
        try:
            cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_match.group())
            return json.loads(cleaned)
        except:
            pass
    except Exception as e:
        print(f"  OpenAI error: {e}")
    return None


def fix_split_headers(content: str) -> str:
    """Fix any split headers in generated content."""
    # Fix headers ending with prepositions followed by continuation
    content = re.sub(
        r'^(#{1,4}\s+\S+(?:\s+\S+){0,2}:?)\s*\n\n(\S+(?:\s+\S+){0,5})\s*$',
        lambda m: f"{m.group(1)} {m.group(2)}",
        content,
        flags=re.MULTILINE
    )
    return content


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
    
    # Get all blog files
    blog_files = sorted(blogs_dir.glob("*.md"))
    total = len(blog_files)
    
    print(f"\nRewriting {total} blogs with new SEO structure...\n")
    
    success = 0
    failed = 0
    
    for i, blog_file in enumerate(blog_files):
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
        
        data = None
        
        # Try each API
        if not data and groq_client:
            data = rewrite_with_groq(prompt, groq_client)
            time.sleep(0.5)
        
        if not data and gemini_model:
            data = rewrite_with_gemini(prompt, gemini_model)
            time.sleep(0.5)
        
        if not data and openai_client:
            data = rewrite_with_openai(prompt, openai_client)
            time.sleep(0.5)
        
        if not data:
            print(f"  ✗ Failed to generate content")
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
        
        # Rate limiting
        time.sleep(0.3)
    
    print(f"\n{'='*60}")
    print(f"Blog rewrite complete!")
    print(f"  Success: {success}/{total}")
    print(f"  Failed: {failed}/{total}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
