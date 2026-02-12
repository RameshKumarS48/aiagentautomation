#!/usr/bin/env python3
"""
AI Blog Generator - Generates trending AI blog posts with images and cross-links.
Uses Groq/Claude API for content generation and Unsplash for images.
"""

import os
import re
import json
import time
import random
import requests
from pathlib import Path
from datetime import datetime
from typing import Optional, List
from dataclasses import dataclass

# Optional: Install with `pip install groq`
try:
    from groq import Groq
    HAS_GROQ = True
except ImportError:
    HAS_GROQ = False

# Optional: Install with `pip install anthropic`
try:
    import anthropic
    HAS_ANTHROPIC = True
except ImportError:
    HAS_ANTHROPIC = False

# Optional: Install with `pip install google-generativeai`
try:
    import google.generativeai as genai
    HAS_GEMINI = True
except ImportError:
    HAS_GEMINI = False

# Optional: Install with `pip install openai`
try:
    from openai import OpenAI
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False


@dataclass
class BlogPost:
    """Structured data for a blog post."""
    title: str
    slug: str
    excerpt: str
    category: str
    tags: List[str]
    content: str
    image: str
    image_alt: str
    read_time: int
    related_agents: List[str]
    featured: bool


# Blog categories with weights (higher = more posts)
BLOG_CATEGORIES = {
    "AI Agents": 20,
    "Machine Learning": 15,
    "Automation": 15,
    "LLM Technology": 12,
    "AI Tools": 12,
    "Tutorials": 10,
    "Industry News": 8,
    "AI Ethics": 5,
    "Future of AI": 3,
}

# Trending topics to write about
TRENDING_TOPICS = [
    # AI Agents
    "autonomous AI agents revolutionizing workflows",
    "multi-agent systems for complex tasks",
    "AI agent frameworks comparison",
    "building your first AI agent",
    "AI agents for customer service",
    "coding agents that write software",
    "research agents for academics",

    # LLM Technology
    "latest GPT developments",
    "Claude vs GPT comparison",
    "open source LLMs in 2025",
    "fine-tuning language models",
    "prompt engineering best practices",
    "RAG systems explained",
    "vector databases for AI",

    # Automation
    "no-code AI automation tools",
    "workflow automation with AI",
    "RPA vs AI agents",
    "automating repetitive tasks",
    "AI-powered data processing",

    # Tutorials
    "getting started with LangChain",
    "building chatbots with AI",
    "deploying AI models to production",
    "AI API integration guide",
    "creating AI workflows",

    # Industry
    "AI in healthcare 2025",
    "AI transforming finance",
    "AI in education",
    "enterprise AI adoption",
    "startup AI tools landscape",

    # Ethics & Future
    "AI safety considerations",
    "responsible AI development",
    "future of work with AI",
    "AI regulation updates",
]

# Unsplash API for images (free tier)
UNSPLASH_ACCESS_KEY = os.environ.get("UNSPLASH_ACCESS_KEY", "")

# Image search terms by category
IMAGE_TERMS = {
    "AI Agents": ["robot", "artificial intelligence", "automation", "technology"],
    "Machine Learning": ["data science", "neural network", "computer", "algorithm"],
    "Automation": ["workflow", "productivity", "office technology", "automation"],
    "LLM Technology": ["language", "chat", "communication", "technology"],
    "AI Tools": ["software", "tools", "technology", "digital"],
    "Tutorials": ["learning", "education", "coding", "computer"],
    "Industry News": ["business", "technology news", "innovation"],
    "AI Ethics": ["ethics", "balance", "responsibility"],
    "Future of AI": ["future", "innovation", "technology"],
}

# Fallback images if Unsplash fails
FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
]


def get_unsplash_image(query: str) -> tuple:
    """Fetch a random image from Unsplash API."""
    if not UNSPLASH_ACCESS_KEY:
        img = random.choice(FALLBACK_IMAGES)
        return img, f"AI technology illustration"

    try:
        response = requests.get(
            "https://api.unsplash.com/photos/random",
            params={"query": query, "orientation": "landscape"},
            headers={"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"},
            timeout=10
        )
        if response.status_code == 200:
            data = response.json()
            return (
                f"{data['urls']['regular']}&w=800&q=80",
                data.get('alt_description', f'{query} illustration')
            )
    except Exception as e:
        print(f"Unsplash error: {e}")

    img = random.choice(FALLBACK_IMAGES)
    return img, f"{query} illustration"


def select_category() -> str:
    """Select a category based on weights."""
    categories = list(BLOG_CATEGORIES.keys())
    weights = list(BLOG_CATEGORIES.values())
    return random.choices(categories, weights=weights, k=1)[0]


def get_existing_agents(content_dir: Path) -> List[str]:
    """Get list of existing agent slugs for cross-linking."""
    agents_dir = content_dir.parent / "agents"
    if agents_dir.exists():
        return [f.stem for f in agents_dir.glob("*.md")]
    return []


def get_blog_prompt(topic: str, category: str, sample_agents: List[str]) -> str:
    """Generate the comprehensive blog prompt following anti-AI writing guidelines."""

    agents_str = ', '.join(sample_agents[:5]) if sample_agents else 'None'

    return f"""You are a senior human content writer and editor.
You write like an experienced practitioner, not like an AI, not like a marketer, and not like a textbook.

Your writing must:
- Sound natural, grounded, and opinionated where appropriate
- Avoid generic filler, buzzwords, or vague claims
- Be useful, specific, and practical
- Feel like it was written by a real person with domain knowledge
- Never mention AI language models or that content was generated

TASK: Write a high-quality blog post.

Topic: {topic}
Category: {category}
Target audience: Developers, tech professionals, and business leaders interested in AI automation
Primary keyword: {topic.split()[0]} {topic.split()[1] if len(topic.split()) > 1 else 'AI'}
Search intent: Informational / How-to
Available agents for cross-linking: {agents_str}

STRUCTURE (Follow exactly):

1. Title: Under 60 characters. Clear, specific, no clickbait.

2. Meta Description (excerpt): 140-160 characters. Clear summary with primary keyword.

3. Introduction (100-150 words):
   - Start with a concrete situation, problem, or observation
   - No definitions or history unless necessary
   - End with what the reader will gain

4. Main Sections (3-5 H2 sections):
   - Each has a clear, specific heading
   - Contains practical insights, not generic explanations
   - Include real-world examples
   - Use short lists where useful
   - Clear reasoning
   - NO paragraphs over 4-5 lines
   - Include internal links to agents using format [Agent Name](/agents/agent-slug/)

5. Practical Section:
   Include ONE of: step-by-step process, checklist, framework, comparison table, or real use-case scenario

6. Common Mistakes (3-5 bullets):
   Short, direct, practical mistakes people make

7. Conclusion (100-150 words):
   - Summarize key insights
   - End with forward-looking or practical takeaway
   - NO clichés like "in conclusion" or "to sum up"

BANNED PHRASES (Never use):
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

STYLE:
- Use short, clear sentences
- Prefer concrete nouns and verbs
- Use examples and specifics
- Conversational but professional tone
- At least one concrete example per main section

SEO RULES:
- Primary keyword in title and first 100 words
- Primary keyword in one H2
- Sprinkle secondary keywords naturally
- Do not keyword-stuff
- Internal links to /agents/ pages only (no external links)

OUTPUT FORMAT - Return ONLY this JSON:

{{
  "title": "string - under 60 chars, clear and specific",
  "slug": "string - URL-friendly slug",
  "excerpt": "string - 140-160 char meta description with keyword",
  "tags": ["array of 4-6 relevant tags"],
  "content": "string - full markdown blog post (1200-1800 words) following the exact structure above",
  "read_time": number - estimated minutes (6-10),
  "related_agents": ["2-4 agent slugs from available list"],
  "featured": boolean
}}

Return ONLY valid JSON, no other text."""


def generate_blog_with_groq(topic: str, category: str, existing_agents: List[str], client) -> Optional[BlogPost]:
    """Generate blog post using Groq API."""

    # Sample some agents for potential cross-linking
    sample_agents = random.sample(existing_agents, min(10, len(existing_agents))) if existing_agents else []

    prompt = get_blog_prompt(topic, category, sample_agents)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.choices[0].message.content

        # Extract JSON from response (handle markdown blocks and surrounding text)
        # Try to find JSON object in the response
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            print(f"No JSON found in response: {text[:200]}...")
            return None

        json_text = json_match.group()

        # Try to parse JSON, with fallback for control character issues
        try:
            data = json.loads(json_text)
        except json.JSONDecodeError as e:
            # Remove problematic control characters
            cleaned = re.sub(r'[\x00-\x1f\x7f-\x9f]', ' ', json_text)
            try:
                data = json.loads(cleaned)
            except json.JSONDecodeError:
                print(f"JSON parse error after cleaning: {e}")
                return None

        # Get image for this category
        image_term = random.choice(IMAGE_TERMS.get(category, ["artificial intelligence"]))
        image_url, image_alt = get_unsplash_image(image_term)

        return BlogPost(
            title=data['title'],
            slug=data['slug'],
            excerpt=data['excerpt'],
            category=category,
            tags=data['tags'],
            content=data['content'],
            image=image_url,
            image_alt=image_alt,
            read_time=data['read_time'],
            related_agents=data.get('related_agents', []),
            featured=data.get('featured', False)
        )

    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        return None
    except Exception as e:
        print(f"Error generating blog: {e}")
        return None


def generate_blog_with_claude(topic: str, category: str, existing_agents: List[str], client) -> Optional[BlogPost]:
    """Generate blog post using Claude API."""

    sample_agents = random.sample(existing_agents, min(10, len(existing_agents))) if existing_agents else []

    prompt = get_blog_prompt(topic, category, sample_agents)

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.content[0].text
        text = re.sub(r'^```json\s*', '', text)
        text = re.sub(r'\s*```$', '', text)
        text = text.strip()

        data = json.loads(text)

        image_term = random.choice(IMAGE_TERMS.get(category, ["artificial intelligence"]))
        image_url, image_alt = get_unsplash_image(image_term)

        return BlogPost(
            title=data['title'],
            slug=data['slug'],
            excerpt=data['excerpt'],
            category=category,
            tags=data['tags'],
            content=data['content'],
            image=image_url,
            image_alt=image_alt,
            read_time=data['read_time'],
            related_agents=data.get('related_agents', []),
            featured=data.get('featured', False)
        )

    except Exception as e:
        print(f"Error generating blog with Claude: {e}")
        return None


def generate_blog_with_gemini(topic: str, category: str, existing_agents: List[str], model) -> Optional[BlogPost]:
    """Generate blog post using Google Gemini API."""

    sample_agents = random.sample(existing_agents, min(10, len(existing_agents))) if existing_agents else []

    prompt = get_blog_prompt(topic, category, sample_agents)

    try:
        response = model.generate_content(prompt)
        text = response.text

        # Extract JSON from response
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            print(f"No JSON found in Gemini response")
            return None

        json_text = json_match.group()

        # Clean and parse JSON
        try:
            data = json.loads(json_text)
        except json.JSONDecodeError:
            cleaned = re.sub(r'[\x00-\x1f\x7f-\x9f]', ' ', json_text)
            data = json.loads(cleaned)

        image_term = random.choice(IMAGE_TERMS.get(category, ["artificial intelligence"]))
        image_url, image_alt = get_unsplash_image(image_term)

        return BlogPost(
            title=data['title'],
            slug=data['slug'],
            excerpt=data['excerpt'],
            category=category,
            tags=data['tags'],
            content=data['content'],
            image=image_url,
            image_alt=image_alt,
            read_time=data['read_time'],
            related_agents=data.get('related_agents', []),
            featured=data.get('featured', False)
        )

    except Exception as e:
        print(f"Error generating blog with Gemini: {e}")
        return None


def generate_blog_with_openai(topic: str, category: str, existing_agents: List[str], client) -> Optional[BlogPost]:
    """Generate blog post using OpenAI API."""

    sample_agents = random.sample(existing_agents, min(10, len(existing_agents))) if existing_agents else []

    prompt = get_blog_prompt(topic, category, sample_agents)

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.choices[0].message.content

        # Extract JSON from response
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            print(f"No JSON found in OpenAI response")
            return None

        json_text = json_match.group()

        try:
            data = json.loads(json_text)
        except json.JSONDecodeError:
            cleaned = re.sub(r'[\x00-\x1f\x7f-\x9f]', ' ', json_text)
            data = json.loads(cleaned)

        image_term = random.choice(IMAGE_TERMS.get(category, ["artificial intelligence"]))
        image_url, image_alt = get_unsplash_image(image_term)

        return BlogPost(
            title=data['title'],
            slug=data['slug'],
            excerpt=data['excerpt'],
            category=category,
            tags=data['tags'],
            content=data['content'],
            image=image_url,
            image_alt=image_alt,
            read_time=data['read_time'],
            related_agents=data.get('related_agents', []),
            featured=data.get('featured', False)
        )

    except Exception as e:
        print(f"Error generating blog with OpenAI: {e}")
        return None


def escape_yaml(text: str) -> str:
    """Escape text for YAML."""
    if not text:
        return ""
    return text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')


def create_blog_file(blog: BlogPost, output_dir: Path) -> Optional[str]:
    """Create markdown file for blog post."""
    slug = re.sub(r'[^a-z0-9]+', '-', blog.slug.lower()).strip('-')
    if not slug or len(slug) < 3:
        return None

    date_str = datetime.now().strftime('%Y-%m-%d')

    # Format arrays for YAML
    def yaml_list(items):
        return '\n'.join(f'  - "{escape_yaml(str(item))}"' for item in items if item)

    content = f'''---
title: "{escape_yaml(blog.title)}"
excerpt: "{escape_yaml(blog.excerpt)}"
category: "{blog.category}"
tags:
{yaml_list(blog.tags)}
author: "AI Agents Team"
image: "{blog.image}"
image_alt: "{escape_yaml(blog.image_alt)}"
published_date: {date_str}
read_time: {blog.read_time}
featured: {str(blog.featured).lower()}
related_agents:
{yaml_list(blog.related_agents)}
related_posts: []
---

{blog.content}
'''

    filepath = output_dir / f"{slug}.md"
    try:
        filepath.write_text(content)
        return str(filepath)
    except Exception as e:
        print(f"Error writing blog: {e}")
        return None


def main():
    """Main blog generation workflow."""
    # Setup
    project_root = Path(__file__).parent.parent
    blogs_dir = project_root / "src" / "content" / "blogs"
    blogs_dir.mkdir(parents=True, exist_ok=True)

    # Track existing slugs
    existing_slugs = set(f.stem for f in blogs_dir.glob("*.md"))

    # Get existing agents for cross-linking
    existing_agents = get_existing_agents(blogs_dir)
    print(f"Found {len(existing_agents)} agents for cross-linking")

    # Setup API clients
    groq_key = os.environ.get("GROQ_API_KEY")
    gemini_key = os.environ.get("GEMINI_API_KEY")
    openai_key = os.environ.get("OPENAI_API_KEY")
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")

    groq_client = Groq(api_key=groq_key) if HAS_GROQ and groq_key else None
    openai_client = OpenAI(api_key=openai_key) if HAS_OPENAI and openai_key else None
    claude_client = anthropic.Anthropic(api_key=anthropic_key) if HAS_ANTHROPIC and anthropic_key else None
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
    if claude_client:
        available_apis.append("Claude")

    if available_apis:
        print(f"Available APIs: {', '.join(available_apis)}")
    else:
        print("No API available. Set GROQ_API_KEY, GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY.")
        return

    # Number of blogs to generate
    num_blogs = int(os.environ.get("BLOG_COUNT", "50"))
    print(f"\nGenerating {num_blogs} blog posts...")

    generated = 0
    attempts = 0
    max_attempts = num_blogs * 2  # Allow for some failures

    while generated < num_blogs and attempts < max_attempts:
        attempts += 1

        # Select topic and category
        topic = random.choice(TRENDING_TOPICS)
        category = select_category()

        print(f"\n[{generated + 1}/{num_blogs}] Generating: {topic} ({category})")

        # Generate blog - try each API in order until one succeeds
        blog = None

        # Try Groq first (fastest, free)
        if not blog and groq_client:
            blog = generate_blog_with_groq(topic, category, existing_agents, groq_client)
            time.sleep(0.3)

        # Try Gemini second (generous free tier)
        if not blog and gemini_model:
            blog = generate_blog_with_gemini(topic, category, existing_agents, gemini_model)
            time.sleep(0.5)

        # Try OpenAI third (paid but cheap with gpt-4o-mini)
        if not blog and openai_client:
            blog = generate_blog_with_openai(topic, category, existing_agents, openai_client)
            time.sleep(0.3)

        # Try Claude last (paid)
        if not blog and claude_client:
            blog = generate_blog_with_claude(topic, category, existing_agents, claude_client)
            time.sleep(0.5)

        if not blog:
            print("  Failed to generate")
            continue

        # Check for duplicate slugs
        slug = re.sub(r'[^a-z0-9]+', '-', blog.slug.lower()).strip('-')
        if slug in existing_slugs:
            print(f"  Slug '{slug}' already exists, skipping")
            continue

        # Save blog
        filepath = create_blog_file(blog, blogs_dir)
        if filepath:
            print(f"  Created: {filepath}")
            existing_slugs.add(slug)
            generated += 1
        else:
            print("  Failed to write file")

    print(f"\n{'='*50}")
    print(f"Done! Generated {generated} blog posts")
    print(f"Total blog posts: {len(list(blogs_dir.glob('*.md')))}")


if __name__ == "__main__":
    main()
