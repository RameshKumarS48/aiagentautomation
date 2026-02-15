import os
import re
import yaml
from pathlib import Path
from collections import Counter

CONTENT_DIR = Path("/Users/apple/aiagentautomation/src/content/agents")

def parse_frontmatter(content):
    match = re.search(r'^---\s+(.*?)\s+---', content, re.DOTALL)
    if not match:
        return None
    try:
        return yaml.safe_load(match.group(1))
    except:
        return None

def debug_app():
    print("--- Debugging App Data ---")
    
    for f in CONTENT_DIR.glob("*.md"):
        data = parse_frontmatter(f.read_text())
        if not data: continue
            
        slug = f.stem
        if 'editor' in slug or 'choice' in slug:
             print(f"FOUND AGENT: slug='{slug}', name='{data.get('name')}', category='{data.get('category')}'")
             
    print("--- Done ---")

if __name__ == "__main__":
    debug_app()
