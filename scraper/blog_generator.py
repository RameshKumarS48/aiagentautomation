#!/usr/bin/env python3
"""
AI Blog Generator - Generates high-quality, SEO-optimized blog posts.
Produces human-like content with proper structure, images, and internal linking.
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
    related_posts: List[str]
    featured: bool


# Blog categories
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

# Trending topics
TRENDING_TOPICS = [
    "autonomous AI agents revolutionizing workflows",
    "multi-agent systems for complex tasks",
    "AI agent frameworks comparison",
    "building your first AI agent",
    "AI agents for customer service",
    "coding agents that write software",
    "research agents for academics",
    "latest GPT developments",
    "Claude vs GPT comparison",
    "open source LLMs in 2025",
    "fine-tuning language models",
    "prompt engineering best practices",
    "RAG systems explained",
    "vector databases for AI",
    "no-code AI automation tools",
    "workflow automation with AI",
    "RPA vs AI agents",
    "automating repetitive tasks",
    "AI-powered data processing",
    "getting started with LangChain",
    "building chatbots with AI",
    "deploying AI models to production",
    "AI API integration guide",
    "creating AI workflows",
    "AI in healthcare 2025",
    "AI transforming finance",
    "AI in education",
    "enterprise AI adoption",
    "startup AI tools landscape",
    "AI safety considerations",
    "responsible AI development",
    "future of work with AI",
    "AI regulation updates",
]

UNSPLASH_ACCESS_KEY = os.environ.get("UNSPLASH_ACCESS_KEY", "")

IMAGE_TERMS = {
    "AI Agents": ["robot", "artificial intelligence", "automation", "futuristic technology"],
    "Machine Learning": ["data science", "neural network", "algorithm", "deep learning"],
    "Automation": ["workflow", "productivity", "office automation", "digital transformation"],
    "LLM Technology": ["language model", "chatbot", "AI conversation", "natural language"],
    "AI Tools": ["software tools", "developer", "coding", "technology workspace"],
    "Tutorials": ["learning", "education", "tutorial", "coding tutorial"],
    "Industry News": ["business technology", "tech news", "innovation", "digital"],
    "AI Ethics": ["ethics", "balance", "responsibility", "decision making"],
    "Future of AI": ["future technology", "innovation", "sci-fi", "advanced tech"],
}

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
        return img, f"AI technology illustration for {query}"

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


def get_multiple_images(category: str, count: int = 3) -> List[tuple]:
    """Get multiple images for inline use in blog content."""
    images = []
    terms = IMAGE_TERMS.get(category, ["artificial intelligence", "technology"])

    for i in range(count):
        term = terms[i % len(terms)]
        img_url, img_alt = get_unsplash_image(term)
        images.append((img_url, img_alt))
        time.sleep(0.3)  # Rate limit

    return images


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


def get_existing_blogs(content_dir: Path) -> List[str]:
    """Get list of existing blog slugs for interlinking."""
    if content_dir.exists():
        return [f.stem for f in content_dir.glob("*.md")]
    return []


def get_blog_prompt(topic: str, category: str, sample_agents: List[str], sample_blogs: List[str], inline_images: List[tuple]) -> str:
    """Generate comprehensive blog prompt with proper SEO and formatting."""

    agents_str = ', '.join(sample_agents[:10]) if sample_agents else 'None'
    blogs_str = ', '.join(sample_blogs[:8]) if sample_blogs else 'None'

    # Format images for the prompt
    images_md = ""
    for i, (url, alt) in enumerate(inline_images):
        images_md += f"Image {i+1}: ![{alt}]({url})\n"

    return f"""You are a senior technical writer who writes engaging, practical content. Your writing sounds human - conversational yet authoritative. You never sound like AI-generated content.

TASK: Write a comprehensive, SEO-optimized blog post.

Topic: {topic}
Category: {category}
Target audience: Developers, tech professionals, and business leaders

AVAILABLE FOR LINKING:
- Agent pages (link format: [Agent Name](/agents/slug/)): {agents_str}
- Other blog posts (link format: [Post Title](/blog/slug/)): {blogs_str}

INLINE IMAGES TO USE (place these naturally in the content):
{images_md}

STRICT REQUIREMENTS:

1. TITLE:
   - Compelling, specific, under 60 characters
   - Include primary keyword
   - NO clickbait or generic titles

2. EXCERPT (meta description):
   - 140-160 characters
   - Include primary keyword naturally
   - Compelling reason to click

3. CONTENT STRUCTURE (2000-2500 words):

   ## Introduction (150-200 words)
   - Hook with a specific problem, scenario, or surprising fact
   - NO generic openings like "In today's world..."
   - State clearly what the reader will learn
   - Include primary keyword in first 100 words

   ## [Descriptive H2 - Main Concept] (300-400 words)
   - Deep dive into the core concept
   - Include a real-world example with specific details
   - Add one inline image here: ![alt](url)
   - Link to 2 relevant agent pages naturally

   ## [Descriptive H2 - Practical Application] (300-400 words)
   - How to actually apply this
   - Step-by-step instructions where relevant
   - Include code snippets if applicable
   - Link to 1-2 related blog posts

   ## [Descriptive H2 - Tools & Solutions] (300-400 words)
   - Specific tools, frameworks, or solutions
   - Comparison or recommendations
   - Add another inline image
   - Link to 2-3 agent pages

   ### [H3 Subsection if needed]
   - Break down complex topics

   ## Step-by-Step Guide / Framework / Checklist (250-300 words)
   - Numbered steps OR
   - Actionable checklist OR
   - Decision framework
   - Make it practical and immediately usable

   ## Common Pitfalls to Avoid (200-250 words)
   - 4-5 specific mistakes with explanations
   - NOT generic advice
   - Include why each is problematic

   ## Key Takeaways (150-200 words)
   - Summarize actionable points
   - Forward-looking statement
   - Clear call-to-action linking to [browse all agents](/agents/)
   - Link to 1-2 related blog posts for further reading

4. INTERNAL LINKING REQUIREMENTS:
   - Minimum 5 links to agent pages (/agents/slug/)
   - Minimum 3 links to other blog posts (/blog/slug/)
   - Links must be contextually relevant
   - Anchor text should be descriptive, not "click here"

5. SEO REQUIREMENTS:
   - Primary keyword in: title, first paragraph, one H2, conclusion
   - Use semantic variations throughout
   - Short paragraphs (3-4 sentences max)
   - Use bullet points and numbered lists
   - Include the provided images with descriptive alt text

6. WRITING STYLE:
   - Conversational but professional
   - Use "you" to address reader directly
   - Include specific numbers, tools, examples
   - Share opinions where appropriate
   - NO buzzwords: leverage, unlock, game-changer, revolutionary, seamless, robust
   - NO filler: "It's worth noting", "It goes without saying"
   - NO AI patterns: "In conclusion", "To sum up", "As we've seen"

OUTPUT FORMAT - Return ONLY this JSON:

{{
  "title": "string",
  "slug": "string",
  "excerpt": "string - 140-160 chars",
  "tags": ["5-6 relevant tags"],
  "content": "string - full markdown content with proper line breaks, images, and links",
  "read_time": number (10-15),
  "related_agents": ["5 agent slugs used in content"],
  "related_posts": ["3 blog slugs used in content"],
  "featured": boolean
}}

IMPORTANT:
- Content must have proper markdown line breaks (actual newlines, not \\n)
- Each paragraph should be separated by blank lines
- Images should be on their own lines
- Lists should have proper formatting

Return ONLY valid JSON."""


def generate_blog_with_groq(topic: str, category: str, agents: List[str], blogs: List[str], images: List[tuple], client) -> Optional[BlogPost]:
    """Generate blog post using Groq API."""
    prompt = get_blog_prompt(topic, category, agents, blogs, images)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            max_tokens=8000,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.choices[0].message.content
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            print(f"No JSON found in Groq response")
            return None

        json_text = json_match.group()
        try:
            data = json.loads(json_text)
        except json.JSONDecodeError:
            cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_text)
            data = json.loads(cleaned)

        # Get header image
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
            read_time=data.get('read_time', 12),
            related_agents=data.get('related_agents', []),
            related_posts=data.get('related_posts', []),
            featured=data.get('featured', False)
        )

    except Exception as e:
        print(f"Groq error: {e}")
        return None


def generate_blog_with_gemini(topic: str, category: str, agents: List[str], blogs: List[str], images: List[tuple], model) -> Optional[BlogPost]:
    """Generate blog post using Gemini API."""
    prompt = get_blog_prompt(topic, category, agents, blogs, images)

    try:
        response = model.generate_content(prompt)
        text = response.text

        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            print(f"No JSON found in Gemini response")
            return None

        json_text = json_match.group()
        try:
            data = json.loads(json_text)
        except json.JSONDecodeError:
            cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_text)
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
            read_time=data.get('read_time', 12),
            related_agents=data.get('related_agents', []),
            related_posts=data.get('related_posts', []),
            featured=data.get('featured', False)
        )

    except Exception as e:
        print(f"Gemini error: {e}")
        return None


def generate_blog_with_openai(topic: str, category: str, agents: List[str], blogs: List[str], images: List[tuple], client) -> Optional[BlogPost]:
    """Generate blog post using OpenAI API."""
    prompt = get_blog_prompt(topic, category, agents, blogs, images)

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            max_tokens=8000,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.choices[0].message.content
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            print(f"No JSON found in OpenAI response")
            return None

        json_text = json_match.group()
        try:
            data = json.loads(json_text)
        except json.JSONDecodeError:
            cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', ' ', json_text)
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
            read_time=data.get('read_time', 12),
            related_agents=data.get('related_agents', []),
            related_posts=data.get('related_posts', []),
            featured=data.get('featured', False)
        )

    except Exception as e:
        print(f"OpenAI error: {e}")
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

    def yaml_list(items):
        if not items:
            return '  - ""'
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
related_posts:
{yaml_list(blog.related_posts)}
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
    project_root = Path(__file__).parent.parent
    blogs_dir = project_root / "src" / "content" / "blogs"
    blogs_dir.mkdir(parents=True, exist_ok=True)

    existing_slugs = set(f.stem for f in blogs_dir.glob("*.md"))
    existing_agents = get_existing_agents(blogs_dir)
    existing_blogs = get_existing_blogs(blogs_dir)

    print(f"Found {len(existing_agents)} agents for cross-linking")
    print(f"Found {len(existing_blogs)} blogs for interlinking")

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

    if available_apis:
        print(f"Available APIs: {', '.join(available_apis)}")
    else:
        print("No API available.")
        return

    num_blogs = int(os.environ.get("BLOG_COUNT", "10"))
    print(f"\nGenerating {num_blogs} blog posts...")

    generated = 0
    attempts = 0
    max_attempts = num_blogs * 3

    while generated < num_blogs and attempts < max_attempts:
        attempts += 1

        topic = random.choice(TRENDING_TOPICS)
        category = select_category()

        print(f"\n[{generated + 1}/{num_blogs}] Generating: {topic} ({category})")

        # Get inline images for this blog
        inline_images = get_multiple_images(category, 2)

        # Sample agents and blogs for linking
        sample_agents = random.sample(existing_agents, min(15, len(existing_agents))) if existing_agents else []
        sample_blogs = random.sample(existing_blogs, min(10, len(existing_blogs))) if existing_blogs else []

        blog = None

        # Try each API
        if not blog and groq_client:
            blog = generate_blog_with_groq(topic, category, sample_agents, sample_blogs, inline_images, groq_client)
            time.sleep(0.5)

        if not blog and gemini_model:
            blog = generate_blog_with_gemini(topic, category, sample_agents, sample_blogs, inline_images, gemini_model)
            time.sleep(0.5)

        if not blog and openai_client:
            blog = generate_blog_with_openai(topic, category, sample_agents, sample_blogs, inline_images, openai_client)
            time.sleep(0.5)

        if not blog:
            print("  Failed to generate")
            continue

        slug = re.sub(r'[^a-z0-9]+', '-', blog.slug.lower()).strip('-')
        if slug in existing_slugs:
            print(f"  Slug '{slug}' already exists, skipping")
            continue

        filepath = create_blog_file(blog, blogs_dir)
        if filepath:
            print(f"  Created: {filepath}")
            existing_slugs.add(slug)
            existing_blogs.append(slug)  # Add to list for future interlinking
            generated += 1
        else:
            print("  Failed to write file")

    print(f"\n{'='*50}")
    print(f"Done! Generated {generated} blog posts")
    print(f"Total blog posts: {len(list(blogs_dir.glob('*.md')))}")


if __name__ == "__main__":
    main()
