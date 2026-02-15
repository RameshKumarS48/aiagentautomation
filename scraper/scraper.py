#!/usr/bin/env python3
"""
AI Agent Scraper - Collects AI agent data from GitHub awesome-lists and generates content.
Uses Claude API or Groq API for intelligent content generation from raw data.
"""

import os
import re
import json
import time
import requests
from pathlib import Path
from datetime import datetime
from typing import Optional, List
from dataclasses import dataclass

# Optional: Install with `pip install anthropic`
try:
    import anthropic
    HAS_ANTHROPIC = True
except ImportError:
    HAS_ANTHROPIC = False
    print("Warning: anthropic package not installed. Run: pip install anthropic")

# Optional: Install with `pip install groq`
try:
    from groq import Groq
    HAS_GROQ = True
except ImportError:
    HAS_GROQ = False
    print("Warning: groq package not installed. Run: pip install groq")

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
class AgentData:
    """Structured data for an AI agent."""
    name: str
    category: str
    source_url: str
    description: str
    tech_stack: List[str]
    problem_solved: str
    target_audience: str
    inputs: List[str]
    outputs: List[str]
    workflow_steps: List[str]
    sample_prompt: str
    tools_used: List[str]
    alternatives: List[str]
    is_open_source: str
    can_self_host: str
    skill_level: str


# GitHub awesome-lists and directories to scrape
SOURCES = [
    # Original sources
    {
        "name": "awesome-ai-agents",
        "url": "https://api.github.com/repos/e2b-dev/awesome-ai-agents/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-llm-agents",
        "url": "https://api.github.com/repos/kaushikb11/awesome-llm-agents/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-gpt-agents",
        "url": "https://api.github.com/repos/fr0gger/Awesome-GPT-Agents/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-ai-tools",
        "url": "https://api.github.com/repos/mahseema/awesome-ai-tools/readme",
        "type": "awesome-list"
    },
    {
        "name": "open-llms",
        "url": "https://api.github.com/repos/eugeneyan/open-llms/readme",
        "type": "awesome-list"
    },
    # Expanded sources - AI Agents & Frameworks
    {
        "name": "best-ai-agents",
        "url": "https://api.github.com/repos/SamurAIGPT/Best-AI-Agents/readme",
        "type": "awesome-list"
    },
    {
        "name": "500-ai-agents-projects",
        "url": "https://api.github.com/repos/NirDiamant/500-AI-Agents-Projects/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-langchain",
        "url": "https://api.github.com/repos/kyrolabs/awesome-langchain/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-llm",
        "url": "https://api.github.com/repos/Hannibal046/Awesome-LLM/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-chatgpt",
        "url": "https://api.github.com/repos/humanloop/awesome-chatgpt/readme",
        "type": "awesome-list"
    },
    # AI Automation & Workflows
    {
        "name": "awesome-ai-devtools",
        "url": "https://api.github.com/repos/jamesmurdza/awesome-ai-devtools/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-llmops",
        "url": "https://api.github.com/repos/tensorchord/Awesome-LLMOps/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-generative-ai",
        "url": "https://api.github.com/repos/steven2358/awesome-generative-ai/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-ai-ml-dl",
        "url": "https://api.github.com/repos/neomatrix369/awesome-ai-ml-dl/readme",
        "type": "awesome-list"
    },
    # Coding & Development AI
    {
        "name": "awesome-ai-coding",
        "url": "https://api.github.com/repos/sourcegraph/awesome-code-ai/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-copilot",
        "url": "https://api.github.com/repos/jondot/awesome-copilot/readme",
        "type": "awesome-list"
    },
    # Industry-specific AI
    {
        "name": "awesome-ai-for-business",
        "url": "https://api.github.com/repos/dair-ai/awesome-AI-for-business/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-production-machine-learning",
        "url": "https://api.github.com/repos/EthicalML/awesome-production-machine-learning/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-mlops",
        "url": "https://api.github.com/repos/visenger/awesome-mlops/readme",
        "type": "awesome-list"
    },
    # RAG & Knowledge Systems
    {
        "name": "awesome-rag",
        "url": "https://api.github.com/repos/NirDiamant/RAG_Techniques/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-vector-search",
        "url": "https://api.github.com/repos/currentslab/awesome-vector-search/readme",
        "type": "awesome-list"
    },
    # Multimodal & Specialized AI
    {
        "name": "awesome-multimodal-ml",
        "url": "https://api.github.com/repos/pliang279/awesome-multimodal-ml/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-vision-language-models",
        "url": "https://api.github.com/repos/jingyi0000/VLM_survey/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-ai-security",
        "url": "https://api.github.com/repos/DeepSpaceHarbor/Awesome-AI-Security/readme",
        "type": "awesome-list"
    },
    # Open Source AI Projects
    {
        "name": "awesome-open-gpt",
        "url": "https://api.github.com/repos/EwingYangs/awesome-open-gpt/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-local-ai",
        "url": "https://api.github.com/repos/janhq/awesome-local-ai/readme",
        "type": "awesome-list"
    },
    # Additional AI Tools & Products
    {
        "name": "awesome-ai-services",
        "url": "https://api.github.com/repos/amusi/awesome-ai-awesomeness/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-gpt4",
        "url": "https://api.github.com/repos/radi-cho/awesome-gpt4/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-claude",
        "url": "https://api.github.com/repos/ianand/awesome-claude/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-gemini",
        "url": "https://api.github.com/repos/henrycunh/awesome-gemini/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-ai-apis",
        "url": "https://api.github.com/repos/TarrySingh/Artificial-Intelligence-Deep-Learning-Machine-Learning-Tutorials/readme",
        "type": "awesome-list"
    },
    # Prompt Engineering & AI Interaction
    {
        "name": "awesome-prompt-engineering",
        "url": "https://api.github.com/repos/promptslab/Awesome-Prompt-Engineering/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-chatgpt-prompts",
        "url": "https://api.github.com/repos/f/awesome-chatgpt-prompts/readme",
        "type": "awesome-list"
    },
    # Data & Analytics AI
    {
        "name": "awesome-data-science",
        "url": "https://api.github.com/repos/academic/awesome-datascience/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-machine-learning",
        "url": "https://api.github.com/repos/josephmisiti/awesome-machine-learning/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-deep-learning",
        "url": "https://api.github.com/repos/ChristosChristofidis/awesome-deep-learning/readme",
        "type": "awesome-list"
    },
    # AI for Specific Use Cases
    {
        "name": "awesome-ai-writing",
        "url": "https://api.github.com/repos/abilzerian/awesome-ai-writing/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-ai-art",
        "url": "https://api.github.com/repos/altryne/awesome-ai-art-image-synthesis/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-ai-music",
        "url": "https://api.github.com/repos/ad-si/awesome-music-production/readme",
        "type": "awesome-list"
    },
    {
        "name": "awesome-ai-video",
        "url": "https://api.github.com/repos/steven2358/awesome-generative-ai/readme",
        "type": "awesome-list"
    },
    # No-Code & Low-Code AI
    {
        "name": "awesome-no-code-ai",
        "url": "https://api.github.com/repos/kairichard/awesome-nocode-lowcode/readme",
        "type": "awesome-list"
    },
]

# Patterns to skip - these are NOT actual AI agents
SKIP_PATTERNS = [
    # Social media and community links
    r'^(the\s+)?documentation$',
    r'^discord(\s+invite)?$',
    r'^github(\s+repository)?$',
    r'^twitter$',
    r'^x$',
    r'^facebook$',
    r'^linkedin$',
    r'^website$',
    r'^youtube',
    r'^blog(-?\s*post)?$',
    r'^paper$',
    r'^web$',
    r'^docs$',
    r'^replit$',
    r'^tweet$',
    r'^founder',
    r'^author',
    r'^creator',
    r'^co-?founder',
    r'^open[\s-]?source[\s-]?projects?$',
    r'^closed[\s-]?source',
    r'^thread[\s-]?describing',
    r'^getting[\s-]?started',
    r'^installation$',
    r'^demo(\s+video)?$',
    r'^announcement$',
    r'^launch',
    r'^roadmap$',
    r'^community$',
    r'^telegram$',
    r'^slack(\s+channel)?$',
    r'^subreddit$',
    r'^medium(\s+blog)?$',
    r'^article$',
    r'^interview',
    r'^hugging[\s-]?face',
    r'^colab',
    r'^chrome[\s-]?extension$',
    r'^vscode[\s-]?extension$',
    r'^docker[\s-]?image$',
    r'^templates?$',
    r'^playground$',
    r'^waitlist$',
    r'^profile',
    r'^ycombinator',
    r'linkedin$',
    r'^license',
    r'^repo$',
    r'^meme$',
    r'^step[\s-]?by[\s-]?step',
    r'^use[\s-]?cases?$',
    r'^streamlit',
    r'^local[\s-]?demo$',
    r'^project[\s-]?(page|demo)$',
    r'^data[\s-]?analysis$',
    r'^arxiv',
    r'^hackernews',
    
    # === NEW FILTERS: Non-Agent Content ===
    # Datasets
    r'dataset',
    r'data[\s-]?set',
    r'data[\s-]?collection',
    r'data[\s-]?repository',
    r'data[\s-]?archive',
    r'data[\s-]?portal',
    r'open[\s-]?data',
    r'public[\s-]?data',
    r'data[\s-]?search',
    r'data[\s-]?viewer',
    
    # Tutorials & Courses
    r'tutorial',
    r'course',
    r'lesson',
    r'workshop',
    r'training',
    r'bootcamp',
    r'certification',
    r'specialization',
    r'learning[\s-]?path',
    r'study[\s-]?guide',
    r'cheat[\s-]?sheet',
    r'reference[\s-]?guide',
    
    # Books & Publications
    r'book',
    r'handbook',
    r'cookbook',
    r'manual',
    r'textbook',
    r'ebook',
    r'publication',
    
    # Papers & Research
    r'research[\s-]?paper',
    r'white[\s-]?paper',
    r'technical[\s-]?report',
    r'survey[\s-]?paper',
    r'conference[\s-]?paper',
    r'journal[\s-]?article',
    r'thesis',
    r'dissertation',
    
    # Learning Resources
    r'introduction[\s-]?to',
    r'getting[\s-]?started[\s-]?with',
    r'beginner',
    r'advanced[\s-]?guide',
    r'from[\s-]?scratch',
    r'explained',
    r'understanding',
    r'basics[\s-]?of',
    r'overview[\s-]?of',
    r'fundamentals',
    
    # Collections & Lists
    r'awesome[\s-]?.*[\s-]?papers',
    r'awesome[\s-]?.*[\s-]?datasets',
    r'awesome[\s-]?.*[\s-]?books',
    r'awesome[\s-]?.*[\s-]?tutorials',
    r'awesome[\s-]?.*[\s-]?courses',
    r'collection[\s-]?of',
    r'list[\s-]?of',
    r'catalog[\s-]?of',
    r'gallery[\s-]?of',
    r'archive[\s-]?of',
    
    # Blogs & Articles
    r'blog[\s-]?post',
    r'article[\s-]?series',
    r'news[\s-]?letter',
    r'weekly[\s-]?digest',
    
    # Examples & Demos
    r'example[\s-]?code',
    r'code[\s-]?sample',
    r'notebook',
    r'jupyter',
    r'ipython',
    
    # Job & Career
    r'job[\s-]?posting',
    r'career',
    r'resume',
    r'cv[\s-]?template',
    r'interview[\s-]?questions',
    
    # Misc Non-Agent Content
    r'roadmap',
    r'comparison',
    r'alternatives[\s-]?to',
    r'best[\s-]?.*[\s-]?alternatives',
    r'projects[\s-]?ideas',
    r'challenge',
    r'competition',
    r'hackathon',
    
    # === DEEP VALIDATION FILTERS: Lists, Directories, Collections ===
    # Numeric lists (500+ tools, 100 best, etc.)
    r'\d+\+?\s*(best|top|ai|ml|llm)?\s*tools?',
    r'\d+\+?\s*ai',
    r'\d+\+?\s*agents?',
    
    # List/Directory/Collection indicators
    r'list[\s-]?of',
    r'directory[\s-]?of',
    r'collection[\s-]?of',
    r'catalog[\s-]?of',
    r'index[\s-]?of',
    r'hub[\s-]?of',
    r'gallery[\s-]?of',
    r'curated[\s-]?(list|collection|directory)',
    r'comprehensive[\s-]?(list|directory)',
    
    # Awesome lists (when they ARE the list, not a tool named "awesome-X")
    r'awesome[\s-]?list',
    r'other[\s-]?awesome[\s-]?lists',
    r'related[\s-]?awesome[\s-]?lists',
    r'complement[\s-]?to[\s-]?this[\s-]?list',
    r'more[\s-]?lists',
    
    # Marketplaces, stores, directories
    r'marketplace',
    r'agent[\s-]?store',
    r'ai[\s-]?store',
    r'tool[\s-]?directory',
    r'agent[\s-]?directory',
    r'ai[\s-]?directory',
    r'ai[\s-]?catalog',
    
    # Aggregators and indexes
    r'aggregat(or|es?|ing)',
    r'compil(ation|es?|ing)',
    
    # Video playlists
    r'playlist',
    r'video[\s-]?series',
    
    # Resource collections
    r'resources?[\s-]?for',
    r'tools?[\s-]?for',
    r'platforms?[\s-]?for',
]



# Compile patterns for efficiency
SKIP_COMPILED = [re.compile(p, re.IGNORECASE) for p in SKIP_PATTERNS]


# ===== COMPREHENSIVE FILTERS (from cleanup analysis) =====

# Invalid URL domains - these are NOT AI agent sources
INVALID_DOMAINS = {
    # Social media
    'twitter.com', 'x.com', 'www.twitter.com',
    'facebook.com', 'www.facebook.com', 'fb.com',
    'linkedin.com', 'www.linkedin.com',
    'instagram.com', 'www.instagram.com',
    'tiktok.com', 'www.tiktok.com',
    'reddit.com', 'www.reddit.com', 'old.reddit.com',
    # Reference/Knowledge (not tools)
    'en.wikipedia.org', 'wikipedia.org',
    'arxiv.org', 'www.arxiv.org',
    'www.slideshare.net', 'slideshare.net',
    'medium.com',
    # Video platforms
    'www.youtube.com', 'youtube.com', 'youtu.be',
    'vimeo.com', 'www.vimeo.com',
    # Package registries (libraries, not agents)
    'cran.r-project.org',
    'godoc.org',
    'rubygems.org',
    'www.npmjs.com', 'npmjs.com',
    'packagist.org', 'crates.io',
    'mvnrepository.com', 'nuget.org',
    'cocoapods.org', 'metacpan.org',
    # Old code hosting
    'sourceforge.net',
    'code.google.com', 'sites.google.com',
    # Academic sites
    'nlp.stanford.edu', 'cs.stanford.edu',
    'www.cs.cmu.edu', 'people.csail.mit.edu',
    # Stats company pages
    'www.sas.com',
    # Forums
    'news.ycombinator.com', 'stackoverflow.com',
}

# Invalid categories - programming languages, bloggers, podcasts, etc.
INVALID_CATEGORIES = {
    # Programming languages (libraries, not agents)
    'python', 'r', 'javascript', 'java', 'c', 'c++', 'c#',
    'go', 'julia', 'clojure', 'scala', 'perl', 'ruby', 'lua',
    'rust', 'haskell', 'swift', 'kotlin', 'elixir', 'erlang',
    'matlab', 'octave', 'lisp', 'fortran', 'crystal',
    # Generic ML/DL packages
    'deep learning packages', 'general machine learning packages',
    'industry strength reinforcement learning',
    'industry strength natural language processing',
    'computation and communication optimisation',
    'natural language processing packages',
    'neural network packages', 'signal processing packages',
    'data manipulation packages',
    # People/Content
    'bloggers', 'podcasts', 'podcasters',
    'researchers', 'influencers', 'educators',
    # Non-agent content
    'comparison', 'contents', 'services',
    'llm leaderboard', 'rankings',
    'hardware', 'infrastructure',
    'credits', 'documentation', 'notebooks',
    'datasets', 'tutorials', 'courses',
    'books', 'papers', 'research papers',
    'other papers', 'lists', 'more lists',
    'other awesome lists', 'related awesome lists',
    'complement to this list', 'videos playlists',
    'index', 'github groups',
    'lists on chatgpt',
}

# ML algorithm / library name patterns (not agents)
NON_AGENT_NAME_PATTERNS = [
    # ML Algorithms
    r'^(linear|logistic|ridge|lasso)\s*regression',
    r'^(k-?means|k-?nn|knn)',
    r'^(svm|support\s*vector)',
    r'^(random\s*forest|decision\s*tree|gradient\s*boost)',
    r'^(xgboost|lightgbm|catboost)',
    r'^(naive\s*bayes|bayesian)',
    r'^(neural\s*network|recurrent\s*neural|convolutional\s*neural)',
    r'^(rnn|cnn|lstm|gru|gan|vae)',
    r'^(pca|tsne|t-sne|umap)',
    r'^(isolation\s*forest|anomaly\s*detection)',
    r'^(apriori|fp-?growth)',
    r'^(adaboost|ada\s*boost)',
    r'^(boltzmann\s*machine)',
    r'^(self-?organizing\s*map)',
    r'^(dimension\s*reduction|dimensionality)',
    r'^(multivariate\s*adaptive)',
    r'^(adaptive\s*resonance)',
    r'^(cart|classification\s*and\s*regression)',
    r'^(laplacian\s*regularization)',
    r'^(heuristic\s*approach)',
    r'^(ensemble\s*method)',
    r'^(markov\s*chain|markov\s*model)',
    r'^(reinforcement\s*learning)',
    r'^(q-?learning)',
    r'^(backpropagation)',
    r'^(word2vec|glove|fasttext)',
    r'^(batch\s*normalization)',
    r'^(dropout|regularization)',
    r'^(cross[\s-]?validation)',
    r'^(confusion\s*matrix)',
    r'^(precision[\s-]?recall)',
    r'^(f1[\s-]?score)',
    r'^(roc[\s-]?curve|auc)',
    # Generic libraries/frameworks
    r'^(numpy|pandas|scipy|matplotlib|seaborn|plotly)',
    r'^(scikit|sklearn)',
    r'^(tensorflow|pytorch|keras|theano|caffe|mxnet)',
    r'^(opencv|pillow|beautifulsoup)',
    r'^(nltk|spacy|gensim|textblob)',
    r'^(spark|hadoop|hive|pig|flink)',
    r'^(docker|kubernetes|terraform)',
    r'^(flask|django|fastapi|express)',
    r'^(react|vue|angular|svelte)',
    # People/Profiles
    r'(blog|vlog|channel|profile|portfolio|resume|cv)$',
    r'^(dr\.|prof\.|professor)\s',
]
NON_AGENT_NAME_COMPILED = [re.compile(p, re.IGNORECASE) for p in NON_AGENT_NAME_PATTERNS]


def should_skip_url(url: str) -> bool:
    """Check if a URL points to a non-agent source."""
    if not url:
        return False
    try:
        from urllib.parse import urlparse
        parsed = urlparse(url)
        domain = parsed.netloc.lower()
        return domain in INVALID_DOMAINS
    except:
        return False


def should_skip_category(category: str) -> bool:
    """Check if a category indicates non-agent content."""
    return category.lower().strip() in INVALID_CATEGORIES


def should_skip_agent(name: str, url: str = '', category: str = '') -> bool:
    """Check if an entry should be skipped based on name, URL, or category."""
    name_lower = name.lower().strip()

    # Skip if matches any skip pattern (name-based)
    for pattern in SKIP_COMPILED:
        if pattern.match(name_lower):
            return True

    # Skip if name is too long (likely a sentence/description, not a name)
    if len(name) > 60 or name.count(' ') > 6:
        return True

    # Skip if contains percentage signs (tweet-like content)
    if '%' in name:
        return True

    # Skip if it's just a person's name with role
    if re.search(r'\b(founder|ceo|cto|cofounder|co-founder)\s*(at|of|@)', name_lower):
        return True

    # Skip ML algorithm / library names
    for pattern in NON_AGENT_NAME_COMPILED:
        if pattern.search(name_lower):
            return True

    # Skip invalid URL domains
    if url and should_skip_url(url):
        return True

    # Skip invalid categories
    if category and should_skip_category(category):
        return True

    return False


def fetch_github_readme(api_url: str, token: Optional[str] = None) -> str:
    """Fetch README content from GitHub API."""
    headers = {"Accept": "application/vnd.github.v3.raw"}
    if token:
        headers["Authorization"] = f"token {token}"

    try:
        response = requests.get(api_url, headers=headers, timeout=30)
        if response.status_code == 200:
            return response.text
        else:
            print(f"Failed to fetch {api_url}: {response.status_code}")
            return ""
    except Exception as e:
        print(f"Error fetching {api_url}: {e}")
        return ""


def parse_awesome_list(content: str) -> List[dict]:
    """Parse markdown awesome-list to extract agent entries."""
    agents = []
    current_category = "General"

    lines = content.split('\n')

    for line in lines:
        # Detect category headers (## or ###)
        if line.startswith('## ') or line.startswith('### '):
            header_text = line.lstrip('#').strip()
            # Clean up category name - remove emojis and special chars
            current_category = re.sub(r'[^\w\s-]', '', header_text).strip()
            if not current_category:
                current_category = "General"
            continue

        # Parse list items with links: - [Name](url) - description
        # or: - **[Name](url)** - description
        match = re.match(r'^[-*]\s+\*?\*?\[([^\]]+)\]\(([^)]+)\)\*?\*?\s*[-–:]?\s*(.*)$', line)
        if match:
            name = match.group(1).strip()
            url = match.group(2).strip()
            description = match.group(3).strip()

            # Skip if it's just a reference link, badge, or matches skip patterns
            if not name or 'badge' in url.lower() or 'shields.io' in url.lower():
                continue

            if should_skip_agent(name, url, current_category):
                continue

            # Clean the description
            description = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', description)  # Remove markdown links
            description = description.strip(' -–:')

            agents.append({
                'name': name,
                'url': url,
                'description': description,
                'category': current_category
            })

    return agents


def generate_content_with_claude(agent: dict, client) -> Optional[AgentData]:
    """Use Claude to generate structured content from raw agent data."""

    prompt = f"""You are generating factual, SEO-optimized documentation for an AI agent.

INPUT DATA:
Name: {agent['name']}
Category: {agent['category']}
Source URL: {agent['url']}
Raw Description: {agent['description']}

Generate a JSON object with these exact fields. Be factual and specific based on the name and URL:

{{
  "name": "{agent['name']}",
  "category": "string - clean category name, e.g. 'Autonomous Agents', 'Coding Assistants', 'Cybersecurity Tools'",
  "source_url": "{agent['url']}",
  "description": "string - 2-3 factual sentences about what this agent/tool does",
  "tech_stack": ["array of likely technologies based on the project"],
  "problem_solved": "string - the specific problem this solves",
  "target_audience": "string - who would use this",
  "inputs": ["array of 3-5 typical inputs"],
  "outputs": ["array of 3-5 typical outputs"],
  "workflow_steps": ["array of 5-7 workflow steps"],
  "sample_prompt": "string - realistic example system prompt or usage",
  "tools_used": ["array of known tools/frameworks/APIs"],
  "alternatives": ["array of 3 similar tools - use real names of competing products"],
  "is_open_source": "Yes/No/Not publicly specified - check if github.com in URL",
  "can_self_host": "Yes/No/Not publicly specified",
  "skill_level": "Beginner/Intermediate/Advanced"
}}

RULES:
- Be factual based on the name, URL domain, and description
- For GitHub projects, assume open source
- Use specific, real alternative tool names
- No marketing language
- Return ONLY valid JSON"""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.content[0].text
        # Clean up potential markdown code blocks
        text = re.sub(r'^```json\s*', '', text)
        text = re.sub(r'\s*```$', '', text)
        text = text.strip()

        data = json.loads(text)
        return AgentData(**data)

    except json.JSONDecodeError as e:
        print(f"JSON parse error for {agent['name']}: {e}")
        return None
    except Exception as e:
        print(f"Error generating content for {agent['name']}: {e}")
        return None


def generate_content_with_groq(agent: dict, client) -> Optional[AgentData]:
    """Use Groq to generate structured content from raw agent data."""

    prompt = f"""You are generating factual, SEO-optimized documentation for an AI agent.

INPUT DATA:
Name: {agent['name']}
Category: {agent['category']}
Source URL: {agent['url']}
Raw Description: {agent['description']}

Generate a JSON object with these exact fields. Be factual and specific based on the name and URL:

{{
  "name": "{agent['name']}",
  "category": "string - clean category name, e.g. 'Autonomous Agents', 'Coding Assistants', 'Cybersecurity Tools'",
  "source_url": "{agent['url']}",
  "description": "string - 2-3 factual sentences about what this agent/tool does",
  "tech_stack": ["array of likely technologies based on the project"],
  "problem_solved": "string - the specific problem this solves",
  "target_audience": "string - who would use this",
  "inputs": ["array of 3-5 typical inputs"],
  "outputs": ["array of 3-5 typical outputs"],
  "workflow_steps": ["array of 5-7 workflow steps"],
  "sample_prompt": "string - realistic example system prompt or usage",
  "tools_used": ["array of known tools/frameworks/APIs"],
  "alternatives": ["array of 3 similar tools - use real names of competing products"],
  "is_open_source": "Yes/No/Not publicly specified - check if github.com in URL",
  "can_self_host": "Yes/No/Not publicly specified",
  "skill_level": "Beginner/Intermediate/Advanced"
}}

RULES:
- Be factual based on the name, URL domain, and description
- For GitHub projects, assume open source
- Use specific, real alternative tool names
- No marketing language
- Return ONLY valid JSON"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.choices[0].message.content
        # Clean up potential markdown code blocks
        text = re.sub(r'^```json\s*', '', text)
        text = re.sub(r'\s*```$', '', text)
        text = text.strip()

        data = json.loads(text)
        return AgentData(**data)

    except json.JSONDecodeError as e:
        print(f"JSON parse error for {agent['name']}: {e}")
        return None
    except Exception as e:
        print(f"Error generating content with Groq for {agent['name']}: {e}")
        return None


def generate_content_with_gemini(agent: dict, model) -> Optional[AgentData]:
    """Use Gemini to generate structured content from raw agent data."""

    prompt = f"""You are generating factual, SEO-optimized documentation for an AI agent.

INPUT DATA:
Name: {agent['name']}
Category: {agent['category']}
Source URL: {agent['url']}
Raw Description: {agent['description']}

Generate a JSON object with these exact fields:

{{
  "name": "{agent['name']}",
  "category": "string - clean category name",
  "source_url": "{agent['url']}",
  "description": "string - 2-3 factual sentences",
  "tech_stack": ["array of technologies"],
  "problem_solved": "string",
  "target_audience": "string",
  "inputs": ["array of 3-5 inputs"],
  "outputs": ["array of 3-5 outputs"],
  "workflow_steps": ["array of 5-7 steps"],
  "sample_prompt": "string",
  "tools_used": ["array of tools"],
  "alternatives": ["array of 3 alternatives"],
  "is_open_source": "Yes/No/Not publicly specified",
  "can_self_host": "Yes/No/Not publicly specified",
  "skill_level": "Beginner/Intermediate/Advanced"
}}

Return ONLY valid JSON."""

    try:
        response = model.generate_content(prompt)
        text = response.text

        # Extract JSON from response
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            return None

        json_text = json_match.group()
        cleaned = re.sub(r'[\x00-\x1f\x7f-\x9f]', ' ', json_text)
        data = json.loads(cleaned)
        return AgentData(**data)

    except Exception as e:
        print(f"Error generating content with Gemini for {agent['name']}: {e}")
        return None


def generate_content_with_openai(agent: dict, client) -> Optional[AgentData]:
    """Use OpenAI to generate structured content from raw agent data."""

    prompt = f"""Generate a JSON object for this AI agent:

Name: {agent['name']}
Category: {agent['category']}
URL: {agent['url']}
Description: {agent['description']}

Return JSON with fields: name, category, source_url, description, tech_stack (array), problem_solved, target_audience, inputs (array), outputs (array), workflow_steps (array), sample_prompt, tools_used (array), alternatives (array), is_open_source, can_self_host, skill_level.

Return ONLY valid JSON."""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.choices[0].message.content
        json_match = re.search(r'\{[\s\S]*\}', text)
        if not json_match:
            return None

        json_text = json_match.group()
        cleaned = re.sub(r'[\x00-\x1f\x7f-\x9f]', ' ', json_text)
        data = json.loads(cleaned)
        return AgentData(**data)

    except Exception as e:
        print(f"Error generating content with OpenAI for {agent['name']}: {e}")
        return None


def generate_content_template(agent: dict) -> AgentData:
    """Generate template content without Claude API (for testing/low-cost mode)."""
    name = agent['name']
    category = agent['category']
    url = agent['url']
    desc = agent.get('description', '')

    # Determine if likely open source
    is_oss = "Yes" if "github.com" in url.lower() else "Not publicly specified"

    # Clean category
    clean_cat = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', category).strip()

    return AgentData(
        name=name,
        category=clean_cat if clean_cat else "AI Tools",
        source_url=url,
        description=f"{name} is an AI agent in the {clean_cat} category. {desc}".strip(),
        tech_stack=["Python", "LLM APIs"] if "github" in url else ["Not publicly specified"],
        problem_solved=f"This tool addresses challenges in the {clean_cat.lower()} domain.",
        target_audience=f"Developers and teams working with {clean_cat.lower()} automation.",
        inputs=["User configuration", "API credentials (if required)", "Task parameters"],
        outputs=["Automated task results", "Status reports", "Generated content or actions"],
        workflow_steps=[
            "User configures the agent with required parameters",
            "Agent receives input data or trigger",
            "Agent processes the request using its core logic",
            "Agent interacts with external services if needed",
            "Results are returned to the user"
        ],
        sample_prompt=f"You are {name}, an AI assistant. Help the user accomplish their task efficiently.",
        tools_used=["LLM APIs", "Python"] if "github" in url else ["Not publicly specified"],
        alternatives=["AutoGPT", "LangChain Agents", "CrewAI"],
        is_open_source=is_oss,
        can_self_host="Yes" if is_oss == "Yes" else "Not publicly specified",
        skill_level="Intermediate"
    )


def escape_yaml(text: str) -> str:
    """Escape quotes for YAML string values."""
    if not text:
        return ""
    return text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')


def create_markdown_file(agent_data: AgentData, output_dir: Path) -> Optional[str]:
    """Create a markdown content file for Astro."""
    # Create slug from name
    slug = re.sub(r'[^a-z0-9]+', '-', agent_data.name.lower()).strip('-')

    if not slug or len(slug) < 2:
        return None

    # Format arrays for YAML
    def yaml_list(items):
        return '\n'.join(f'  - "{escape_yaml(str(item))}"' for item in items if item)

    # Escape string fields
    desc = escape_yaml(agent_data.description)
    problem = escape_yaml(agent_data.problem_solved)
    audience = escape_yaml(agent_data.target_audience)
    category = escape_yaml(agent_data.category)
    date_str = datetime.now().strftime('%Y-%m-%d')

    content = f'''---
name: "{escape_yaml(agent_data.name)}"
category: "{category}"
source_url: "{agent_data.source_url}"
description: "{desc}"
tech_stack:
{yaml_list(agent_data.tech_stack)}
problem_solved: "{problem}"
target_audience: "{audience}"
inputs:
{yaml_list(agent_data.inputs)}
outputs:
{yaml_list(agent_data.outputs)}
workflow_steps:
{yaml_list(agent_data.workflow_steps)}
sample_prompt: |
  {agent_data.sample_prompt}
tools_used:
{yaml_list(agent_data.tools_used)}
alternatives:
{yaml_list(agent_data.alternatives)}
is_open_source: "{agent_data.is_open_source}"
can_self_host: "{agent_data.can_self_host}"
skill_level: "{agent_data.skill_level}"
last_updated: {date_str}
---

<!-- Additional notes or content can go here -->
'''

    filepath = output_dir / f"{slug}.md"
    try:
        filepath.write_text(content)
        return str(filepath)
    except Exception as e:
        print(f"Error writing {filepath}: {e}")
        return None


def main():
    """Main scraper workflow."""
    # Setup paths
    project_root = Path(__file__).parent.parent
    content_dir = project_root / "src" / "content" / "agents"
    content_dir.mkdir(parents=True, exist_ok=True)

    # Track existing files to avoid duplicates
    existing_slugs = set()
    for f in content_dir.glob("*.md"):
        existing_slugs.add(f.stem)

    # Check for API keys
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")
    groq_key = os.environ.get("GROQ_API_KEY")
    gemini_key = os.environ.get("GEMINI_API_KEY")
    openai_key = os.environ.get("OPENAI_API_KEY")

    use_claude = HAS_ANTHROPIC and anthropic_key
    use_groq = HAS_GROQ and groq_key
    use_gemini = HAS_GEMINI and gemini_key
    use_openai = HAS_OPENAI and openai_key

    claude_client = None
    groq_client = None
    gemini_model = None
    openai_client = None

    if use_claude:
        claude_client = anthropic.Anthropic(api_key=anthropic_key)
        print("Claude API available for content generation")

    if use_groq:
        groq_client = Groq(api_key=groq_key)
        print("Groq API available")

    if use_gemini:
        genai.configure(api_key=gemini_key)
        gemini_model = genai.GenerativeModel('gemini-2.0-flash')
        print("Gemini API available")

    if use_openai:
        openai_client = OpenAI(api_key=openai_key)
        print("OpenAI API available")

    if not use_claude and not use_groq and not use_gemini and not use_openai:
        print("No AI API keys found - using template-based content generation")

    # GitHub token (optional, increases rate limits)
    github_token = os.environ.get("GITHUB_TOKEN")

    all_agents = []

    # Scrape sources
    for source in SOURCES:
        print(f"\nFetching: {source['name']}")
        content = fetch_github_readme(source['url'], github_token)

        if content:
            agents = parse_awesome_list(content)
            print(f"  Found {len(agents)} valid agents")
            all_agents.extend(agents)

        time.sleep(1)  # Rate limiting

    # Deduplicate by name (case-insensitive)
    seen = set()
    unique_agents = []
    for agent in all_agents:
        name_key = agent['name'].lower().strip()
        if name_key not in seen and len(name_key) > 1:
            seen.add(name_key)
            unique_agents.append(agent)

    print(f"\nTotal unique agents after filtering: {len(unique_agents)}")

    # Generate content files
    generated = 0
    skipped = 0

    for i, agent in enumerate(unique_agents):
        slug = re.sub(r'[^a-z0-9]+', '-', agent['name'].lower()).strip('-')

        # Skip if already exists
        if slug in existing_slugs:
            skipped += 1
            continue

        # Double-check with comprehensive filters (URL + category)
        if should_skip_agent(agent['name'], agent.get('url', ''), agent.get('category', '')):
            skipped += 1
            continue

        print(f"Processing {i+1}/{len(unique_agents)}: {agent['name']}")

        try:
            agent_data = None

            # Try Claude first
            if use_claude and claude_client:
                agent_data = generate_content_with_claude(agent, claude_client)
                time.sleep(0.5)

            # Fall back to Groq
            if not agent_data and use_groq and groq_client:
                agent_data = generate_content_with_groq(agent, groq_client)
                time.sleep(0.3)

            # Fall back to Gemini
            if not agent_data and use_gemini and gemini_model:
                agent_data = generate_content_with_gemini(agent, gemini_model)
                time.sleep(0.5)

            # Fall back to OpenAI
            if not agent_data and use_openai and openai_client:
                agent_data = generate_content_with_openai(agent, openai_client)
                time.sleep(0.3)

            # Fall back to template if all AI APIs fail
            if not agent_data:
                agent_data = generate_content_template(agent)

            if agent_data:
                filepath = create_markdown_file(agent_data, content_dir)
                if filepath:
                    print(f"  Created: {filepath}")
                    generated += 1
                    existing_slugs.add(slug)

        except Exception as e:
            print(f"  Error: {e}")
            continue

    print(f"\nDone! Generated {generated} new files, skipped {skipped} existing")
    print(f"Total content files: {len(list(content_dir.glob('*.md')))}")


if __name__ == "__main__":
    main()
