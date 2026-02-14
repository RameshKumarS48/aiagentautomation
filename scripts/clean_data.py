import re
import yaml
from pathlib import Path

AGENTS_DIR = Path("/Users/apple/aiagentautomation/src/content/agents")

def clean_category(cat):
    # Remove markdown links: [Name](url) -> Name
    cat = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', cat)
    return cat.strip()

def process_file(file_path):
    content = file_path.read_text()
    match = re.search(r'^---\s+(.*?)\s+---', content, re.DOTALL)
    if not match:
        return
        
    try:
        frontmatter = yaml.safe_load(match.group(1))
        original_cat = frontmatter.get('category', '')
        
        if not original_cat:
            return
            
        clean = clean_category(original_cat)
        
        if clean != original_cat:
            print(f"Fixing category in {file_path.name}: '{original_cat}' -> '{clean}'")
            frontmatter['category'] = clean
            
            # Reconstruct
            # new_fm = yaml.dump(frontmatter, sort_keys=False, allow_unicode=True).strip()
            # Simplistic replacement to avoid losing other formatting if possible, 
            # or just dump it. Given the analyze script showed standard format, dump is fine.
            
            # actually let's use a simpler regex replace on the specific line to be safe
            # pattern: category: .*
            new_content = re.sub(r'category:\s+.*', f'category: {clean}', content, count=1)
            file_path.write_text(new_content)
            
    except Exception as e:
        print(f"Error processing {file_path.name}: {e}")

def main():
    print("Cleaning agent data...")
    for f in AGENTS_DIR.glob("*.md"):
        process_file(f)
    print("Done.")

if __name__ == "__main__":
    main()
