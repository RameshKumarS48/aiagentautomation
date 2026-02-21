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

# Trending topics - Expanded to 250+ for diversity
TRENDING_TOPICS = [
    # AI Agents & Autonomous Systems (40 topics)
    "autonomous AI agents revolutionizing workflows",
    "multi-agent systems for complex tasks",
    "AI agent frameworks comparison 2025",
    "building your first AI agent step by step",
    "AI agents for customer service automation",
    "coding agents that write software",
    "research agents for academics and scientists",
    "AI agents for data analysis and insights",
    "conversational AI agents best practices",
    "AI agents for content creation and marketing",
    "AI agents in supply chain optimization",
    "AI agents for financial trading and analysis",
    "AI agents for legal document review",
    "AI agents in healthcare diagnostics",
    "AI agents for personalized education",
    "AI agents for cybersecurity threat detection",
    "AI agents for social media management",
    "AI agents for email automation",
    "AI agents for project management",
    "AI agents for recruitment and HR",
    "AI agents for sales and lead generation",
    "AI agents for inventory management",
    "AI agents for quality assurance testing",
    "AI agents for code review and debugging",
    "AI agents for database optimization",
    "AI agents for network monitoring",
    "AI agents for fraud detection",
    "AI agents for sentiment analysis",
    "AI agents for recommendation systems",
    "AI agents for predictive maintenance",
    "AI agents for smart home automation",
    "AI agents for vehicle fleet management",
    "AI agents for energy grid optimization",
    "AI agents for weather forecasting",
    "AI agents for agricultural monitoring",
    "AI agents for disaster response coordination",
    "AI agents for urban planning and smart cities",
    "AI agents for environmental monitoring",
    "AI agents for wildlife conservation",
    "AI agents for space exploration",
    
    # LLM Technology & Models (40 topics)
    "latest GPT-4 and GPT-5 developments",
    "Claude 3 vs GPT-4 ultimate comparison",
    "open source LLMs in 2025 comprehensive guide",
    "fine-tuning language models for your business",
    "prompt engineering best practices 2025",
    "small language models SLMs rising trend",
    "multimodal AI models combining text image audio",
    "LLM hallucination detection and prevention",
    "LLM context window optimization techniques",
    "LLM inference optimization for production",
    "LLM quantization and compression methods",
    "LLM evaluation metrics and benchmarks",
    "LLM safety and alignment techniques",
    "LLM fine-tuning vs RAG comparison",
    "LLM prompt injection attacks and defenses",
    "LLM for code generation best models",
    "LLM for translation and localization",
    "LLM for summarization techniques",
    "LLM for question answering systems",
    "LLM for dialogue and conversation",
    "LLM for creative writing and storytelling",
    "LLM for technical documentation",
    "LLM for medical diagnosis support",
    "LLM for legal contract analysis",
    "LLM for financial report generation",
    "LLM for scientific paper writing",
    "LLM for educational content creation",
    "LLM for marketing copy generation",
    "LLM for product descriptions",
    "LLM for customer support responses",
    "LLM parameter efficient fine-tuning PEFT",
    "LLM low-rank adaptation LoRA explained",
    "LLM reinforcement learning from human feedback RLHF",
    "LLM direct preference optimization DPO",
    "LLM constitutional AI and safety",
    "LLM chain of thought prompting",
    "LLM few-shot and zero-shot learning",
    "LLM retrieval augmented generation RAG",
    "LLM mixture of experts MoE architecture",
    "LLM transformer alternatives and innovations",
    
    # RAG & Vector Databases (25 topics)
    "RAG systems explained comprehensive guide",
    "vector databases for AI applications",
    "building production RAG systems",
    "RAG vs fine-tuning when to use each",
    "chunking strategies for RAG systems",
    "embedding models comparison 2025",
    "vector similarity search optimization",
    "hybrid search combining dense and sparse",
    "RAG evaluation metrics and testing",
    "RAG hallucination reduction techniques",
    "RAG context window management",
    "RAG for enterprise knowledge bases",
    "RAG for customer support automation",
    "RAG for legal document search",
    "RAG for medical literature review",
    "RAG for code search and documentation",
    "Pinecone vs Weaviate vs Milvus comparison",
    "Chroma vs Qdrant vector database showdown",
    "building semantic search with embeddings",
    "document preprocessing for RAG pipelines",
    "metadata filtering in vector search",
    "reranking strategies for RAG systems",
    "RAG caching and performance optimization",
    "RAG security and data privacy",
    "RAG cost optimization strategies",
    
    # AI Tools & Frameworks (30 topics)
    "no-code AI automation tools 2025",
    "workflow automation with AI platforms",
    "LangChain comprehensive tutorial",
    "LlamaIndex for data framework",
    "AutoGPT autonomous agent setup",
    "BabyAGI task-driven autonomous agent",
    "SuperAGI framework for AGI development",
    "Semantic Kernel Microsoft AI orchestration",
    "Haystack NLP framework guide",
    "Hugging Face Transformers tutorial",
    "OpenAI API integration best practices",
    "Anthropic Claude API guide",
    "Google Gemini API tutorial",
    "Cohere AI platform overview",
    "Replicate AI model deployment",
    "Modal serverless AI infrastructure",
    "Weights and Biases MLOps platform",
    "MLflow experiment tracking guide",
    "DVC data version control for ML",
    "Great Expectations data quality testing",
    "Evidently AI model monitoring",
    "Streamlit AI app development",
    "Gradio ML demo creation",
    "FastAPI for ML model serving",
    "Docker containers for ML deployment",
    "Kubernetes for ML workloads",
    "Ray distributed computing for AI",
    "Dask parallel computing Python",
    "Apache Spark for big data ML",
    "TensorFlow vs PyTorch 2025 comparison",
    
    # AI in Industry Applications (30 topics)
    "AI in healthcare 2025 revolution",
    "AI transforming finance and banking",
    "AI in education personalized learning",
    "AI in retail customer experience",
    "AI in manufacturing predictive maintenance",
    "AI in agriculture precision farming",
    "AI in transportation autonomous vehicles",
    "AI in energy smart grid optimization",
    "AI in telecommunications network management",
    "AI in insurance claims processing",
    "AI in real estate property valuation",
    "AI in hospitality guest experience",
    "AI in entertainment content recommendation",
    "AI in gaming procedural generation",
    "AI in sports performance analytics",
    "AI in fashion trend forecasting",
    "AI in food industry quality control",
    "AI in pharmaceutical drug discovery",
    "AI in biotechnology genetic research",
    "AI in environmental science climate modeling",
    "AI in construction project planning",
    "AI in logistics route optimization",
    "AI in aviation flight safety",
    "AI in maritime shipping optimization",
    "AI in mining resource exploration",
    "AI in oil and gas exploration",
    "AI in utilities demand forecasting",
    "AI in government public services",
    "AI in defense and security",
    "AI in space exploration and research",
    
    # Technical Deep Dives (25 topics)
    "RPA vs AI agents automation evolution",
    "automating repetitive tasks with AI",
    "AI-powered data processing pipelines",
    "deploying AI models to production",
    "AI API integration comprehensive guide",
    "creating AI workflows and pipelines",
    "AI model versioning and management",
    "AI model monitoring and observability",
    "AI model explainability and interpretability",
    "AI model bias detection and mitigation",
    "AI model security and adversarial attacks",
    "AI model compression and optimization",
    "AI model quantization techniques",
    "AI model pruning strategies",
    "AI model distillation methods",
    "AI model ensemble techniques",
    "AI model transfer learning",
    "AI model federated learning",
    "AI model continual learning",
    "AI model active learning",
    "AI model semi-supervised learning",
    "AI model self-supervised learning",
    "AI model reinforcement learning",
    "AI model meta-learning",
    "AI model neural architecture search",
    
    # Ethics, Safety & Regulation (20 topics)
    "AI safety considerations 2025",
    "responsible AI development practices",
    "AI regulation updates and compliance",
    "AI ethics in practice guidelines",
    "AI bias and fairness testing",
    "AI transparency and explainability",
    "AI privacy and data protection",
    "AI accountability and governance",
    "AI environmental impact and sustainability",
    "AI job displacement and workforce transition",
    "AI in decision making ethical considerations",
    "AI copyright and intellectual property",
    "AI misinformation and deepfakes",
    "AI surveillance and civil liberties",
    "AI weapons and autonomous systems",
    "AI healthcare ethics and consent",
    "AI financial fairness and discrimination",
    "AI criminal justice bias",
    "AI education equity and access",
    "AI global governance and cooperation",
    
    # Future Trends & Innovation (20 topics)
    "future of work with AI agents",
    "enterprise AI adoption strategies",
    "startup AI tools landscape 2025",
    "AI democratization and accessibility",
    "AI edge computing and on-device AI",
    "AI quantum computing integration",
    "AI neuromorphic computing advances",
    "AI brain-computer interfaces",
    "AI augmented reality applications",
    "AI virtual reality experiences",
    "AI Internet of Things IoT integration",
    "AI 5G and 6G networks",
    "AI blockchain and Web3",
    "AI digital twins and simulation",
    "AI synthetic data generation",
    "AI generative design and creativity",
    "AI human-AI collaboration",
    "AI artificial general intelligence AGI progress",
    "AI consciousness and sentience debates",
    "AI long-term existential risks",
    
    # Practical Guides & Tutorials (20 topics)
    "building chatbots with AI complete guide",
    "creating conversational AI assistants",
    "developing voice AI applications",
    "building image recognition systems",
    "creating video analysis AI",
    "developing natural language processing apps",
    "building recommendation engines",
    "creating anomaly detection systems",
    "developing time series forecasting models",
    "building sentiment analysis tools",
    "creating text classification systems",
    "developing named entity recognition",
    "building question answering systems",
    "creating text summarization tools",
    "developing machine translation systems",
    "building speech recognition apps",
    "creating text-to-speech systems",
    "developing OCR optical character recognition",
    "building document classification systems",
    "creating knowledge graph applications",
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
    """Generate comprehensive SEO-optimised blog prompt."""

    agents_str = ', '.join(sample_agents[:10]) if sample_agents else 'None'
    blogs_str = ', '.join(sample_blogs[:8]) if sample_blogs else 'None'

    # Format images for the prompt
    images_md = ""
    for i, (url, alt) in enumerate(inline_images):
        images_md += f"Image {i+1}: ![{alt}]({url})\n"

    return f"""You are a strict SEO blog generation engine.

Your task is to generate a fully SEO-optimised blog post while following the structure exactly as provided below.

You must follow these rules strictly:

Do not rename headings.
Do not add extra sections.
Do not remove sections.
Do not add commentary, notes, or explanations.
Do not include AI disclaimers.
Do not wrap the output in code blocks.
Output clean markdown only.
If the structure is violated, regenerate internally before responding.

---

Content Inputs:
Primary Keyword: {topic}
Secondary Keywords: {category}, AI agents, automation, machine learning
Target Audience: Developers, tech professionals, and business leaders
Search Intent: informational
Tone: Authoritative, clear, concise
Language: British English
Word Count Target: 1200-1500 words

---

SEO Requirements:

Include the primary keyword in:
- H1
- Introduction
- At least one H2
- Conclusion

Distribute secondary keywords naturally.
Use short paragraphs (2-4 lines).
Avoid keyword stuffing.
Use bullet points where specified.
Maintain logical flow and strong readability.

---

AVAILABLE FOR LINKING:
- Agent pages (link format: [Agent Name](/agents/slug/)): {agents_str}
- Other blog posts (link format: [Post Title](/blog/slug/)): {blogs_str}

INLINE IMAGES TO USE (place these naturally in the content):
{images_md}

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

Return output in EXACT markdown structure below:

# {{primary_keyword}}: A Complete Guide for {{target_audience}}

## Introduction

(120-150 words. Clearly define the topic and match search intent.)

## What is {{primary_keyword}}?

(200-250 words. Clear, structured explanation.)

## Key Benefits of {{primary_keyword}}

(Use bullet points. 250-300 words total.)

## How {{primary_keyword}} Works

(250-300 words. Step-by-step explanation.)

## Common Mistakes to Avoid

(200-250 words. Practical insights.)

## FAQs

### What is the main purpose of {{primary_keyword}}?

(80-100 words.)

### Is {{primary_keyword}} suitable for {{target_audience}}?

(80-100 words.)

### How do I get started with {{primary_keyword}}?

(80-100 words.)

## Conclusion

(120-150 words. Summarise and reinforce value.)

The response must begin directly with the H1 heading and follow the structure exactly.

---

OUTPUT FORMAT - Return ONLY this JSON:

{{{{
  "title": "string - under 60 chars",
  "slug": "string - URL-friendly slug",
  "excerpt": "string - 140-160 chars meta description",
  "tags": ["5-6 relevant tags"],
  "content": "string - full markdown content following the exact structure above with proper line breaks, images, and links",
  "read_time": number (6-10),
  "related_agents": ["5 agent slugs used in content"],
  "related_posts": ["3 blog slugs used in content"],
  "featured": boolean
}}}}

---

CRITICAL FORMATTING RULES:
- Content must have proper markdown line breaks (actual newlines, not \\\\n)
- Each paragraph should be separated by blank lines
- Images should be on their own lines
- Lists should have proper formatting with blank lines around them
- HEADERS MUST BE ON A SINGLE LINE - never split a header across lines
- After a header, always put a blank line, then the paragraph text
- Keep paragraphs to 2-4 lines maximum
- Use * for bullet points, not -

Only output the final JSON. Do not include explanations, notes, or metadata.

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
    batch_size = 50  # Generate in batches to avoid API rate limits
    print(f"\nGenerating {num_blogs} blog posts in batches of {batch_size}...")

    generated = 0
    attempts = 0
    max_attempts = num_blogs * 3
    
    # Calculate number of batches
    num_batches = (num_blogs + batch_size - 1) // batch_size
    
    for batch_num in range(num_batches):
        batch_start = batch_num * batch_size
        batch_end = min(batch_start + batch_size, num_blogs)
        batch_target = batch_end - batch_start
        
        print(f"\n{'='*60}")
        print(f"BATCH {batch_num + 1}/{num_batches}: Generating {batch_target} blogs")
        print(f"Progress: {generated}/{num_blogs} total blogs generated")
        print(f"{'='*60}\n")
        
        batch_generated = 0
        
        while batch_generated < batch_target and attempts < max_attempts:
            attempts += 1

            topic = random.choice(TRENDING_TOPICS)
            category = select_category()

            print(f"[{generated + 1}/{num_blogs}] Generating: {topic} ({category})")

            # Get inline images for this blog
            inline_images = get_multiple_images(category, 2)

            # Sample agents and blogs for linking
            sample_agents = random.sample(existing_agents, min(15, len(existing_agents))) if existing_agents else []
            sample_blogs = random.sample(existing_blogs, min(10, len(existing_blogs))) if existing_blogs else []

            blog = None

            # Try each API with retry logic
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
                print(f"  ✓ Created: {filepath.name}")
                existing_slugs.add(slug)
                existing_blogs.append(slug)  # Add to list for future interlinking
                generated += 1
                batch_generated += 1
            else:
                print("  Failed to create file")
        
        # Batch complete summary
        print(f"\nBatch {batch_num + 1} complete: {batch_generated}/{batch_target} blogs generated")
        
        # Small delay between batches
        if batch_num < num_batches - 1:
            print("Pausing 2 seconds before next batch...")
            time.sleep(2)

    print(f"\n{'='*60}")
    print(f"Blog generation complete!")
    print(f"  Total generated: {generated}/{num_blogs}")
    print(f"  Total attempts: {attempts}")
    print(f"  Success rate: {(generated/attempts*100):.1f}%")
    print(f"{'='*60}\n")
    print(f"Total blog posts: {len(list(blogs_dir.glob('*.md')))}")


if __name__ == "__main__":
    main()
