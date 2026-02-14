import os
import re
import yaml
import glob
from pathlib import Path
from datetime import datetime
from collections import Counter

# Paths
PROJECT_ROOT = Path("/Users/apple/aiagentautomation")
BLOGS_DIR = PROJECT_ROOT / "src/content/blogs"
AGENTS_DIR = PROJECT_ROOT / "src/content/agents"

def parse_frontmatter(content):
    match = re.search(r'^---\s+(.*?)\s+---', content, re.DOTALL)
    if not match:
        return None, None, None
    try:
        data = yaml.safe_load(match.group(1))
        return data, match.group(1), match.end()
    except yaml.YAMLError as e:
        print(f"YAML Error: {e}")
        return None, None, None

def get_blog_metadata():
    blogs = []
    for blog_file in BLOGS_DIR.glob("*.md"):
        content = blog_file.read_text()
        frontmatter, _, _ = parse_frontmatter(content)
        if frontmatter:
            blogs.append({
                'slug': blog_file.stem,
                'tags': frontmatter.get('tags', []),
                'file': blog_file
            })
    return blogs

def find_related_posts(current_blog, all_blogs):
    if not current_blog['tags']:
        return []
    
    scores = []
    current_tags = set(current_blog['tags'])
    
    for other_blog in all_blogs:
        if other_blog['slug'] == current_blog['slug']:
            continue
            
        other_tags = set(other_blog['tags'])
        overlap = len(current_tags.intersection(other_tags))
        if overlap > 0:
            scores.append((overlap, other_blog['slug']))
    
    # Sort by overlap (descending) and take top 3
    scores.sort(key=lambda x: x[0], reverse=True)
    return [s[1] for s in scores[:3]]

def fix_content_formatting(content):
    # Fix headers that run into previous text (e.g., "...end. ## Header")
    # Pattern: Non-newline char + whitespace + Header marker
    content = re.sub(r'([^\n])\s+(#{1,6}\s)', r'\1\n\n\2', content)
    
    # Ensure headers have a newline after them if missing (rare but good to check)
    # This might be too aggressive if not careful, but let's stick to the main issue first.
    
    # Fix lists that might be inline (start with * or - followed by space)
    # content = re.sub(r'([^\n])\s+([*-]\s)', r'\1\n\2', content) 
    # Be careful not to break emphasis like *bold* inside text. 
    # Valid lists usually start lines. If they are inline like "Items: * A * B", we want "Items:\n* A\n* B"
    
    # Let's target specific common bad patterns seen in the file view earlier
    # " ... text. * List item" -> " ... text.\n\n* List item"
    content = re.sub(r'([^\n])\s+(\*\s)', r'\1\n\n\2', content)
    
    return content

def fix_links(content):
    # Fix specific typos (handle potential trailing slash)
    content = re.sub(r'\(/agents/im\s+packetgpt/?\)', '(/agents/impacketgpt/)', content)
    
    # Fix empty agent links: [text](/agents/) -> [text](/agents/text-slug)
    def repl_empty_agent(match):
        text = match.group(1)
        slug = text.lower().replace(' ', '-')
        
        # known directory links
        if slug in ['browse-all-agents', 'directory', 'agents', 'ai-agents', 'ai-agents-directory', 'all-agents']:
             return f"[{text}](/agents/)"
             
        return f"[{text}](/agents/{slug}/)"

    # Matches [Something](/agents/) or [Something](/agents)
    content = re.sub(r'\[([^\]]+)\]\(/agents/?\)', repl_empty_agent, content)
    
    # Also fix the ones we already broke (e.g. /agents/browse-all-agents/)
    # Pattern: /agents/(directory|agents|...)/
    for bad_slug in ['browse-all-agents', 'directory', 'agents', 'ai-agents', 'ai-agents-directory']:
        content = content.replace(f'/agents/{bad_slug}/', '/agents/')
    
    return content

def update_blog(blog_entry, all_blogs):
    file_path = blog_entry['file']
    content = file_path.read_text()
    frontmatter_dict, raw_frontmatter, content_start = parse_frontmatter(content)
    
    if not frontmatter_dict:
        print(f"Skipping {file_path.name} (invalid frontmatter)")
        return

    # 1. Update Related Posts
    related = find_related_posts(blog_entry, all_blogs)
    if not related:
        # Fallback: pick 3 recent blogs (excluding self)
        recent = sorted([b for b in all_blogs if b['slug'] != blog_entry['slug']], 
                        key=lambda x: x['slug'], reverse=True)[:3]
        related = [b['slug'] for b in recent]
        
    frontmatter_dict['related_posts'] = related

    # Reconstruct Frontmatter
    new_frontmatter = yaml.dump(frontmatter_dict, sort_keys=False, allow_unicode=True).strip()
    
    # 2. Process Body
    body = content[content_start:].strip()
    
    # Apply content fixes
    body = fix_content_formatting(body)
    body = fix_links(body)
    
    # Reassemble
    new_content = f"---\n{new_frontmatter}\n---\n\n{body}\n"
    
    if new_content != content:
        file_path.write_text(new_content)
        print(f"Fixed {file_path.name}")
    else:
        print(f"No changes for {file_path.name}")

def main():
    print("Starting blog fix process...")
    all_blogs = get_blog_metadata()
    print(f"Found {len(all_blogs)} blogs.")
    
    for blog in all_blogs:
        update_blog(blog, all_blogs)
        
    print("Done!")

if __name__ == "__main__":
    main()
