# AI Agent Automation Site

SEO-optimized documentation site for AI agents and automation tools.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Site will be available at http://localhost:4321

### 3. Build for production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Scraper Usage

The scraper collects AI agent data from GitHub awesome-lists.

### Setup

```bash
cd scraper
pip install -r requirements.txt
```

### Run (Template Mode - No API cost)

```bash
python scraper.py
```

### Run (Claude API - Higher quality content)

```bash
export ANTHROPIC_API_KEY=your_key_here
export GITHUB_TOKEN=your_github_token  # Optional, increases rate limits
python scraper.py
```

## Adding Content Manually

Create a new `.md` file in `src/content/agents/` with this frontmatter:

```yaml
---
name: "Agent Name"
category: "Category"
source_url: "https://..."
description: "2-3 sentence description"
tech_stack:
  - "Python"
  - "OpenAI"
problem_solved: "What problem this solves"
target_audience: "Who uses this"
inputs:
  - "Input 1"
  - "Input 2"
outputs:
  - "Output 1"
  - "Output 2"
workflow_steps:
  - "Step 1"
  - "Step 2"
sample_prompt: |
  Your system prompt here
tools_used:
  - "Tool 1"
alternatives:
  - "Alt 1"
  - "Alt 2"
  - "Alt 3"
is_open_source: "Yes"
can_self_host: "Yes"
skill_level: "Intermediate"
last_updated: 2025-01-15
---
```

## Deploy to Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Netlify will auto-detect settings from `netlify.toml`

Or use Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Project Structure

```
aiagentautomation/
├── src/
│   ├── content/
│   │   └── agents/          # Agent markdown files
│   ├── layouts/
│   │   └── BaseLayout.astro # Main layout
│   └── pages/
│       ├── index.astro      # Homepage
│       ├── agents/          # Agent pages
│       └── categories/      # Category pages
├── scraper/
│   ├── scraper.py           # Main scraper
│   └── requirements.txt
├── public/
│   └── robots.txt
├── astro.config.mjs
├── netlify.toml
└── package.json
```
