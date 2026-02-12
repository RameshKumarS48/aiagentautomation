#!/usr/bin/env python3
"""
Blog Regeneration Script - Rewrites existing blogs with professional, human-like content.
Run manually when API rate limits reset.
"""

import os
import re
import json
import time
import random
import yaml
from pathlib import Path
from datetime import datetime
from typing import Optional, List

# Import AI clients
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


def get_existing_agents(agents_dir: Path) -> List[str]:
    """Get list of existing agent slugs for cross-linking."""
    if agents_dir.exists():
        return [f.stem for f in agents_dir.glob("*.md")]
    return []


def get_regeneration_prompt(title: str, category: str, sample_agents: List[str]) -> str:
    """Generate comprehensive prompt for blog regeneration."""

    agents_str = ', '.join(sample_agents[:8]) if sample_agents else 'None'

    return f"""You are a senior human content writer and editor.
You write like an experienced practitioner, not like an AI, not like a marketer, and not like a textbook.

Your writing must:
- Sound natural, grounded, and opinionated where appropriate
- Avoid generic filler, buzzwords, or vague claims
- Be useful, specific, and practical
- Feel like it was written by a real person with domain knowledge
- Never mention AI language models or that content was generated

TASK: Rewrite this blog post professionally.

Original Title: {title}
Category: {category}
Target audience: Developers, tech professionals, and business leaders interested in AI automation
Available agents for internal linking: {agents_str}

STRUCTURE (Follow exactly):

1. Title: Keep similar to original but make it compelling. Under 60 characters.

2. Meta Description (excerpt): 140-160 characters. Clear summary with primary keyword.

3. Introduction (100-150 words):
   - Start with a concrete situation, problem, or observation
   - No definitions or history unless necessary
   - End with what the reader will gain

4. Main Sections (4-5 H2 sections):
   - Each has a clear, specific heading
   - Contains practical insights, not generic explanations
   - Include real-world examples with specific details
   - Use short lists where useful
   - NO paragraphs over 4-5 lines
   - Include 3-5 internal links to agents using format [Agent Name](/agents/agent-slug/)

5. Practical Section (H2: "Step-by-Step Guide" or "Practical Framework" or "Checklist"):
   Include ONE of: numbered step-by-step process, checklist with checkboxes, framework, or comparison table

6. Common Mistakes (H2):
   3-5 bullet points. Short, direct, practical mistakes people make.

7. Conclusion (100-150 words):
   - Summarize key insights
   - End with forward-looking or practical takeaway
   - Link to related content on the site
   - NO clichés like "in conclusion" or "to sum up"

BANNED PHRASES (Never use these):
- "In today's fast-paced world"
- "It's important to note that"
- "Leverage"
- "Unlock the power of"
- "Game-changer"
- "Revolutionary"
- "Seamless"
- "Robust solution"
- "Dive into"
- "Navigate the landscape"
- "Harness the power"
- "At the end of the day"
- "Moving forward"

STYLE:
- Use short, clear sentences
- Prefer concrete nouns and verbs
- Include specific numbers, tools, and examples
- Conversational but professional tone
- At least one concrete example per main section
- Use bullet points and numbered lists liberally

SEO & LINKING:
- Primary keyword in title and first 100 words
- 3-5 internal links to /agents/ pages naturally woven in
- 2-3 internal links to /blog/ for related topics (use format [Related Post](/blog/slug/))
- Link to /categories/ page where relevant
- End with CTA linking to [browse all agents](/agents/)

OUTPUT FORMAT - Return ONLY this JSON:

{{
  "title": "string - under 60 chars, clear and specific",
  "slug": "string - URL-friendly slug",
  "excerpt": "string - 140-160 char meta description with keyword",
  "tags": ["array of 5-6 relevant tags"],
  "content": "string - full markdown blog post (1400-1800 words) following the exact structure above with proper line breaks and formatting",
  "read_time": number - estimated minutes (7-12),
  "related_agents": ["3-5 agent slugs from available list"],
  "featured": boolean
}}

Return ONLY valid JSON, no other text."""


def regenerate_with_groq(title: str, category: str, agents: List[str], client) -> Optional[dict]:
    """Regenerate blog using Groq."""
    prompt = get_regeneration_prompt(title, category, agents)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            max_tokens=6000,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.choices[0].message.content
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            return None

        json_text = json_match.group()
        try:
            return json.loads(json_text)
        except json.JSONDecodeError:
            cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_text)
            return json.loads(cleaned)
    except Exception as e:
        print(f"  Groq error: {e}")
        return None


def regenerate_with_gemini(title: str, category: str, agents: List[str], model) -> Optional[dict]:
    """Regenerate blog using Gemini."""
    prompt = get_regeneration_prompt(title, category, agents)

    try:
        response = model.generate_content(prompt)
        text = response.text

        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            return None

        json_text = json_match.group()
        try:
            return json.loads(json_text)
        except json.JSONDecodeError:
            cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_text)
            return json.loads(cleaned)
    except Exception as e:
        print(f"  Gemini error: {e}")
        return None


def regenerate_with_openai(title: str, category: str, agents: List[str], client) -> Optional[dict]:
    """Regenerate blog using OpenAI."""
    prompt = get_regeneration_prompt(title, category, agents)

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            max_tokens=6000,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.choices[0].message.content
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            return None

        json_text = json_match.group()
        try:
            return json.loads(json_text)
        except json.JSONDecodeError:
            cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_text)
            return json.loads(cleaned)
    except Exception as e:
        print(f"  OpenAI error: {e}")
        return None


def escape_yaml(text: str) -> str:
    """Escape text for YAML."""
    if not text:
        return ""
    return text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')


def parse_existing_blog(filepath: Path) -> dict:
    """Parse existing blog file to extract metadata."""
    content = filepath.read_text()

    # Split frontmatter and content
    parts = content.split('---', 2)
    if len(parts) < 3:
        return None

    try:
        frontmatter = yaml.safe_load(parts[1])
        return {
            'title': frontmatter.get('title', ''),
            'category': frontmatter.get('category', 'AI Tools'),
            'image': frontmatter.get('image', ''),
            'image_alt': frontmatter.get('image_alt', ''),
            'published_date': frontmatter.get('published_date', datetime.now().strftime('%Y-%m-%d')),
        }
    except:
        return None


def save_blog(filepath: Path, data: dict, original: dict):
    """Save regenerated blog to file."""

    def yaml_list(items):
        return '\n'.join(f'  - "{escape_yaml(str(item))}"' for item in items if item)

    # Keep original image and date
    image = original.get('image', '')
    image_alt = original.get('image_alt', '')
    pub_date = original.get('published_date', datetime.now().strftime('%Y-%m-%d'))

    if hasattr(pub_date, 'strftime'):
        pub_date = pub_date.strftime('%Y-%m-%d')

    content = f'''---
title: "{escape_yaml(data['title'])}"
excerpt: "{escape_yaml(data['excerpt'])}"
category: "{original.get('category', 'AI Tools')}"
tags:
{yaml_list(data['tags'])}
author: "AI Agents Team"
image: "{image}"
image_alt: "{escape_yaml(image_alt)}"
published_date: {pub_date}
read_time: {data['read_time']}
featured: {str(data.get('featured', False)).lower()}
related_agents:
{yaml_list(data.get('related_agents', []))}
related_posts: []
---

{data['content']}
'''

    filepath.write_text(content)


def main():
    """Main regeneration workflow."""
    project_root = Path(__file__).parent.parent
    blogs_dir = project_root / "src" / "content" / "blogs"
    agents_dir = project_root / "src" / "content" / "agents"

    if not blogs_dir.exists():
        print("Blogs directory not found!")
        return

    # Get existing agents for linking
    existing_agents = get_existing_agents(agents_dir)
    print(f"Found {len(existing_agents)} agents for cross-linking")

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

    available_apis = []
    if groq_client:
        available_apis.append("Groq")
    if gemini_model:
        available_apis.append("Gemini")
    if openai_client:
        available_apis.append("OpenAI")

    if not available_apis:
        print("No API available. Set GROQ_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY.")
        return

    print(f"Available APIs: {', '.join(available_apis)}")

    # Get all blog files
    blog_files = sorted(blogs_dir.glob("*.md"))
    print(f"\nFound {len(blog_files)} blogs to regenerate")

    # Limit per run to avoid rate limits
    max_per_run = int(os.environ.get("REGEN_COUNT", "10"))
    blog_files = blog_files[:max_per_run]
    print(f"Processing {len(blog_files)} blogs this run")

    regenerated = 0
    failed = 0

    for i, filepath in enumerate(blog_files):
        print(f"\n[{i+1}/{len(blog_files)}] Regenerating: {filepath.stem}")

        # Parse existing blog
        original = parse_existing_blog(filepath)
        if not original:
            print("  Failed to parse, skipping")
            failed += 1
            continue

        # Sample agents for linking
        sample_agents = random.sample(existing_agents, min(15, len(existing_agents)))

        # Try each API
        data = None

        if not data and groq_client:
            data = regenerate_with_groq(original['title'], original['category'], sample_agents, groq_client)
            time.sleep(1)

        if not data and gemini_model:
            data = regenerate_with_gemini(original['title'], original['category'], sample_agents, gemini_model)
            time.sleep(1)

        if not data and openai_client:
            data = regenerate_with_openai(original['title'], original['category'], sample_agents, openai_client)
            time.sleep(0.5)

        if data:
            save_blog(filepath, data, original)
            print(f"  Regenerated successfully")
            regenerated += 1
        else:
            print(f"  Failed to regenerate")
            failed += 1

        # Rate limiting
        time.sleep(2)

    print(f"\n{'='*50}")
    print(f"Done! Regenerated {regenerated} blogs, {failed} failed")


if __name__ == "__main__":
    main()
