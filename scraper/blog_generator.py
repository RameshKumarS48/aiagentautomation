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


def generate_blog_with_groq(topic: str, category: str, existing_agents: List[str], client) -> Optional[BlogPost]:
    """Generate blog post using Groq API."""

    # Sample some agents for potential cross-linking
    sample_agents = random.sample(existing_agents, min(10, len(existing_agents))) if existing_agents else []

    prompt = f"""You are writing an SEO-optimized blog post for an AI agents directory website.

TOPIC: {topic}
CATEGORY: {category}
AVAILABLE AGENTS FOR CROSS-LINKING: {', '.join(sample_agents[:5]) if sample_agents else 'None'}

Generate a JSON object with these exact fields:

{{
  "title": "string - catchy, SEO-friendly title (50-60 chars)",
  "slug": "string - URL-friendly slug from title",
  "excerpt": "string - compelling 150-160 char meta description",
  "tags": ["array of 4-6 relevant tags"],
  "content": "string - full markdown blog post (800-1200 words) with:
    - Engaging introduction
    - 3-4 H2 sections with valuable content
    - Bullet points and lists where appropriate
    - Internal links to agents using format [Agent Name](/agents/agent-slug/)
    - Practical tips and insights
    - Strong conclusion with call-to-action
    - NO external links, only internal links to /agents/ pages",
  "read_time": number - estimated minutes to read (4-8),
  "related_agents": ["array of 2-4 agent slugs from the available list that relate to this topic"],
  "featured": boolean - true if this is exceptionally good content
}}

RULES:
- Write authoritative, helpful content
- Use natural language, avoid AI-sounding phrases
- Include specific examples and use cases
- Make internal links to agents natural (e.g., "tools like [AutoGPT](/agents/autogpt/) can help...")
- Focus on practical value for readers
- SEO-optimize with keywords naturally integrated
- Return ONLY valid JSON"""

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

    prompt = f"""You are writing an SEO-optimized blog post for an AI agents directory website.

TOPIC: {topic}
CATEGORY: {category}
AVAILABLE AGENTS FOR CROSS-LINKING: {', '.join(sample_agents[:5]) if sample_agents else 'None'}

Generate a JSON object with these exact fields:

{{
  "title": "string - catchy, SEO-friendly title (50-60 chars)",
  "slug": "string - URL-friendly slug from title",
  "excerpt": "string - compelling 150-160 char meta description",
  "tags": ["array of 4-6 relevant tags"],
  "content": "string - full markdown blog post (800-1200 words)",
  "read_time": number - estimated minutes to read (4-8),
  "related_agents": ["array of 2-4 agent slugs"],
  "featured": boolean
}}

Return ONLY valid JSON."""

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
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")

    groq_client = Groq(api_key=groq_key) if HAS_GROQ and groq_key else None
    claude_client = anthropic.Anthropic(api_key=anthropic_key) if HAS_ANTHROPIC and anthropic_key else None

    if groq_client:
        print("Using Groq API for blog generation")
    elif claude_client:
        print("Using Claude API for blog generation")
    else:
        print("No API available. Set GROQ_API_KEY or ANTHROPIC_API_KEY.")
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

        # Generate blog
        blog = None
        if groq_client:
            blog = generate_blog_with_groq(topic, category, existing_agents, groq_client)
            time.sleep(0.5)  # Rate limiting

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
