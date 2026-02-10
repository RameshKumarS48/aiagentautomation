#!/usr/bin/env python3
"""
AI Agent Scraper - Collects AI agent data from GitHub awesome-lists and generates content.
Uses Claude API for intelligent content generation from raw data.
"""

import os
import re
import json
import time
import requests
from pathlib import Path
from datetime import datetime
from typing import Optional, List
from dataclasses import dataclass, asdict

# Optional: Install with `pip install anthropic`
try:
    import anthropic
    HAS_ANTHROPIC = True
except ImportError:
    HAS_ANTHROPIC = False
    print("Warning: anthropic package not installed. Run: pip install anthropic")


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
]


def fetch_github_readme(api_url: str, token: Optional[str] = None) -> str:
    """Fetch README content from GitHub API."""
    headers = {"Accept": "application/vnd.github.v3.raw"}
    if token:
        headers["Authorization"] = f"token {token}"

    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to fetch {api_url}: {response.status_code}")
        return ""


def parse_awesome_list(content: str) -> list[dict]:
    """Parse markdown awesome-list to extract agent entries."""
    agents = []
    current_category = "General"

    lines = content.split('\n')

    for line in lines:
        # Detect category headers
        if line.startswith('## '):
            current_category = line[3:].strip()
            # Clean up category name
            current_category = re.sub(r'\s*[🤖🔧💡📚🎯🛠️⚡🔥🌟]', '', current_category).strip()
            continue

        # Parse list items with links: - [Name](url) - description
        # or: - **[Name](url)** - description
        match = re.match(r'^[-*]\s+\*?\*?\[([^\]]+)\]\(([^)]+)\)\*?\*?\s*[-–:]?\s*(.*)$', line)
        if match:
            name = match.group(1).strip()
            url = match.group(2).strip()
            description = match.group(3).strip()

            # Skip if it's just a reference link or empty
            if not name or 'badge' in url.lower():
                continue

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

Generate a JSON object with these exact fields:
- name: string (the agent name)
- category: string (cleaned up category)
- source_url: string (the URL)
- description: string (2-3 sentence factual overview)
- tech_stack: array of strings (likely technologies, or empty if unknown)
- problem_solved: string (what problem this solves)
- target_audience: string (who would use this)
- inputs: array of strings (typical inputs required)
- outputs: array of strings (what it produces)
- workflow_steps: array of strings (5-7 step example workflow)
- sample_prompt: string (example system prompt or pseudo-logic)
- tools_used: array of strings (known tools/frameworks/APIs)
- alternatives: array of 3 strings (similar tools)
- is_open_source: string ("Yes", "No", or "Not publicly specified")
- can_self_host: string ("Yes", "No", or "Not publicly specified")
- skill_level: string ("Beginner", "Intermediate", "Advanced", or "Not publicly specified")

RULES:
- Be factual and neutral
- If information is unknown, use reasonable inference or "Not publicly specified"
- No marketing language or hype
- Base answers on the name, URL domain, and description provided

Return ONLY valid JSON, no other text."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}]
        )

        # Extract JSON from response
        text = response.content[0].text
        # Clean up potential markdown code blocks
        text = re.sub(r'^```json\s*', '', text)
        text = re.sub(r'\s*```$', '', text)

        data = json.loads(text)
        return AgentData(**data)

    except Exception as e:
        print(f"Error generating content for {agent['name']}: {e}")
        return None


def generate_content_template(agent: dict) -> AgentData:
    """Generate template content without Claude API (for testing/low-cost mode)."""
    name = agent['name']
    category = agent['category']

    return AgentData(
        name=name,
        category=category,
        source_url=agent['url'],
        description=f"{name} is an AI agent in the {category} category. {agent['description']}",
        tech_stack=["Not publicly specified"],
        problem_solved=f"This agent addresses automation challenges in the {category.lower()} domain.",
        target_audience=f"Developers and teams working with {category.lower()} automation.",
        inputs=["User configuration", "API credentials (if required)", "Task parameters"],
        outputs=["Automated task results", "Status reports", "Generated content or actions"],
        workflow_steps=[
            "User configures the agent with required parameters",
            "Agent receives input data or trigger",
            "Agent processes the request using its core logic",
            "Agent interacts with external services if needed",
            "Results are returned to the user or downstream system"
        ],
        sample_prompt=f"You are {name}, an AI assistant specialized in {category.lower()}. Help the user accomplish their task efficiently and accurately.",
        tools_used=["Not publicly specified"],
        alternatives=["AutoGPT", "LangChain Agents", "CrewAI"],
        is_open_source="Not publicly specified" if "github.com" not in agent['url'].lower() else "Yes (likely)",
        can_self_host="Not publicly specified",
        skill_level="Intermediate"
    )


def escape_yaml(text: str) -> str:
    """Escape quotes for YAML string values."""
    return text.replace('"', '\\"')


def create_markdown_file(agent_data: AgentData, output_dir: Path) -> str:
    """Create a markdown content file for Astro."""
    # Create slug from name
    slug = re.sub(r'[^a-z0-9]+', '-', agent_data.name.lower()).strip('-')

    # Format arrays for YAML
    def yaml_list(items):
        return '\n'.join(f'  - "{escape_yaml(item)}"' for item in items)

    # Escape string fields
    desc = escape_yaml(agent_data.description)
    problem = escape_yaml(agent_data.problem_solved)
    audience = escape_yaml(agent_data.target_audience)
    date_str = datetime.now().strftime('%Y-%m-%d')

    content = f'''---
name: "{agent_data.name}"
category: "{agent_data.category}"
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
    filepath.write_text(content)
    return str(filepath)


def main():
    """Main scraper workflow."""
    # Setup paths
    project_root = Path(__file__).parent.parent
    content_dir = project_root / "src" / "content" / "agents"
    content_dir.mkdir(parents=True, exist_ok=True)

    # Check for API key
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    use_claude = HAS_ANTHROPIC and api_key

    if use_claude:
        client = anthropic.Anthropic(api_key=api_key)
        print("Using Claude API for content generation")
    else:
        print("Using template-based content generation (set ANTHROPIC_API_KEY for AI generation)")

    # GitHub token (optional, increases rate limits)
    github_token = os.environ.get("GITHUB_TOKEN")

    all_agents = []

    # Scrape sources
    for source in SOURCES:
        print(f"\nFetching: {source['name']}")
        content = fetch_github_readme(source['url'], github_token)

        if content:
            agents = parse_awesome_list(content)
            print(f"  Found {len(agents)} agents")
            all_agents.extend(agents)

        # Rate limiting
        time.sleep(1)

    # Deduplicate by name
    seen = set()
    unique_agents = []
    for agent in all_agents:
        if agent['name'].lower() not in seen:
            seen.add(agent['name'].lower())
            unique_agents.append(agent)

    print(f"\nTotal unique agents: {len(unique_agents)}")

    # Generate content files
    generated = 0
    for i, agent in enumerate(unique_agents):
        print(f"Processing {i+1}/{len(unique_agents)}: {agent['name']}")

        try:
            if use_claude:
                agent_data = generate_content_with_claude(agent, client)
                time.sleep(0.5)  # Rate limiting
            else:
                agent_data = generate_content_template(agent)

            if agent_data:
                filepath = create_markdown_file(agent_data, content_dir)
                print(f"  Created: {filepath}")
                generated += 1

        except Exception as e:
            print(f"  Error: {e}")
            continue

    print(f"\nDone! Generated {generated} content files in {content_dir}")


if __name__ == "__main__":
    main()
