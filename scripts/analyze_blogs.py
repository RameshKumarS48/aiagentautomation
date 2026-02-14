import os
import re
import yaml
from pathlib import Path
from datetime import datetime

# Paths
PROJECT_ROOT = Path("/Users/apple/aiagentautomation")
BLOGS_DIR = PROJECT_ROOT / "src/content/blogs"
AGENTS_DIR = PROJECT_ROOT / "src/content/agents"

def parse_frontmatter(content):
    match = re.search(r'^---\s+(.*?)\s+---', content, re.DOTALL)
    if not match:
        return None, None
    try:
        return yaml.safe_load(match.group(1)), match.end()
    except yaml.YAMLError as e:
        print(f"YAML Error: {e}")
        return None, None

def check_blogs():
    if not BLOGS_DIR.exists():
        print("Blogs directory not found!")
        return

    # Get all valid agent slugs
    agent_slugs = {f.stem for f in AGENTS_DIR.glob("*.md")}
    # Get all valid blog slugs
    blog_slugs = {f.stem for f in BLOGS_DIR.glob("*.md")}

    issues = []
    
    print(f"Analyzing {len(blog_slugs)} blog posts...")

    for blog_file in BLOGS_DIR.glob("*.md"):
        content = blog_file.read_text()
        frontmatter, content_start = parse_frontmatter(content)
        
        if not frontmatter:
            issues.append(f"{blog_file.name}: Invalid or missing frontmatter")
            continue
            
        # Check required fields (based on src/content/config.ts)
        required_fields = ['title', 'excerpt', 'category', 'tags', 'published_date', 'read_time']
        for field in required_fields:
            if field not in frontmatter:
                issues.append(f"{blog_file.name}: Missing required field '{field}'")

        # Check related_agents
        if 'related_agents' in frontmatter:
            for agent in frontmatter['related_agents']:
                if agent not in agent_slugs:
                    issues.append(f"{blog_file.name}: Invalid related_agent '{agent}'")

        # Check related_posts
        if 'related_posts' in frontmatter:
            for post in frontmatter['related_posts']:
                if post not in blog_slugs:
                    issues.append(f"{blog_file.name}: Invalid related_post '{post}'")

        # Check content length
        body = content[content_start:].strip()
        if len(body) < 100:
             issues.append(f"{blog_file.name}: Content too short ({len(body)} chars)")

        # Check for placeholder text
        if "Lorem ipsum" in body or "TODO" in body:
            issues.append(f"{blog_file.name}: Contains placeholder text (Lorem ipsum/TODO)")

        # Check Date Format (should be YYYY-MM-DD or datetime object)
        # Check Date Format (should be YYYY-MM-DD or datetime object)
        if 'published_date' in frontmatter:
             date_val = frontmatter['published_date']
             from datetime import date
             if not isinstance(date_val, (str, datetime, date)):
                 issues.append(f"{blog_file.name}: Invalid date type '{type(date_val)}'")

        if 'image' in frontmatter:
            img = frontmatter['image']
            if not img.startswith('http') and not img.startswith('/'):
                 issues.append(f"{blog_file.name}: Invalid image URL '{img}'")

        # Check body for broken internal links
        links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', body)
        for text, url in links:
            if url.startswith('/agents/'):
                slug = url.replace('/agents/', '').strip('/')
                if slug not in agent_slugs:
                    issues.append(f"{blog_file.name}: Broken link to agent '{slug}'")
            elif url.startswith('/blogs/'):
                slug = url.replace('/blogs/', '').strip('/')
                if slug not in blog_slugs:
                    issues.append(f"{blog_file.name}: Broken link to blog '{slug}'")

        # Check for empty related items
        if not frontmatter.get('related_agents'):
             issues.append(f"{blog_file.name}: No related_agents")
        if not frontmatter.get('related_posts'):
             issues.append(f"{blog_file.name}: No related_posts")

    if not issues:
        print("\nNo issues found!")
    else:
        print(f"\nFound {len(issues)} issues:")
        for issue in sorted(issues):
            print(f"- {issue}")

if __name__ == "__main__":
    check_blogs()
