#!/usr/bin/env python3
"""
Blog Content Optimizer - Makes blogs SEO-optimized and human-readable
Fixes: merged headers, poor paragraph structure, random special characters
Based on 2025 SEO best practices
"""

import re
from pathlib import Path
from typing import List, Tuple

def clean_content(content: str) -> str:
    """
    Clean and optimize blog content for SEO and readability.
    
    SEO Best Practices Applied:
    - Proper heading hierarchy with blank lines
    - Short paragraphs (2-4 sentences)
    - Bullet points properly formatted
    - No random special characters or inline breaks
    - Clean, scannable structure
    """
    
    # Step 1: Fix headers that are merged with text at the END of sentences
    # Pattern: "text. # Header" -> "text.\n\n# Header"
    content = re.sub(r'([.!?])\s+(#{1,6}\s+)', r'\1\n\n\2', content)
    
    # Step 2: Fix headers that are merged with text at the BEGINNING
    # Pattern: "# Header text continues" -> "# Header\n\ntext continues"
    lines = content.split('\n')
    fixed_lines = []
    
    for line in lines:
        # Check if line starts with header but has text after the header title
        match = re.match(r'^(#{1,6}\s+[^#\n]+?)(\s+[A-Z][^#]+)$', line)
        if match:
            header = match.group(1).strip()
            text = match.group(2).strip()
            fixed_lines.append(header)
            fixed_lines.append('')
            fixed_lines.append(text)
        else:
            fixed_lines.append(line)
    
    content = '\n'.join(fixed_lines)
    
    # Step 3: Ensure all headers have blank lines before and after
    content = re.sub(r'([^\n])\n(#{1,6}\s+)', r'\1\n\n\2', content)
    content = re.sub(r'(#{1,6}\s+[^\n]+)\n([^\n#])', r'\1\n\n\2', content)
    
    # Step 4: Fix bullet points - ensure they're on their own lines
    content = re.sub(r'([.!?])\s*(\*\s+)', r'\1\n\n\2', content)
    content = re.sub(r'([^\n])\n(\*\s+)', r'\1\n\n\2', content)
    
    # Step 5: Remove random special characters and clean up
    lines = content.split('\n')
    cleaned_lines = []
    
    for line in lines:
        # Skip empty lines for now
        if not line.strip():
            cleaned_lines.append('')
            continue
            
        # Check if line is a bullet point
        if re.match(r'^\s*\*\s+', line):
            cleaned_lines.append(line)
            continue
            
        # Check if line is a header
        if re.match(r'^\s*#{1,6}\s+', line):
            cleaned_lines.append(line)
            continue
            
        # Regular paragraph line - remove random asterisks
        line = re.sub(r'\s+\*\s+', ' ', line)  # Remove random asterisks
        line = re.sub(r'\s{2,}', ' ', line)  # Normalize spaces
        
        cleaned_lines.append(line)
    
    content = '\n'.join(cleaned_lines)
    
    # Step 5: Break long paragraphs into shorter ones (2-4 sentences max)
    # This improves readability significantly
    paragraphs = content.split('\n\n')
    optimized_paragraphs = []
    
    for para in paragraphs:
        # Skip headers, bullets, and empty lines
        if not para.strip() or para.strip().startswith('#') or para.strip().startswith('*'):
            optimized_paragraphs.append(para)
            continue
        
        # Split long paragraphs by sentences
        sentences = re.split(r'([.!?]+\s+)', para)
        
        # Reconstruct with proper breaks
        current_para = []
        sentence_count = 0
        
        for i in range(0, len(sentences), 2):
            if i < len(sentences):
                sentence = sentences[i]
                punctuation = sentences[i+1] if i+1 < len(sentences) else ''
                
                if sentence.strip():
                    current_para.append(sentence + punctuation)
                    sentence_count += 1
                    
                    # Break after 3-4 sentences for readability
                    if sentence_count >= 3 and i+2 < len(sentences):
                        optimized_paragraphs.append(''.join(current_para).strip())
                        current_para = []
                        sentence_count = 0
        
        if current_para:
            optimized_paragraphs.append(''.join(current_para).strip())
    
    content = '\n\n'.join(optimized_paragraphs)
    
    # Step 6: Clean up excessive blank lines (max 2 in a row)
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    # Step 7: Ensure proper spacing around lists
    content = re.sub(r'([^\n])\n(\*\s+)', r'\1\n\n\2', content)
    content = re.sub(r'(\*\s+[^\n]+)\n([^\n\*#])', r'\1\n\n\2', content)
    
    return content.strip() + '\n'


def process_blog_file(filepath: Path) -> Tuple[bool, str]:
    """Process a single blog file."""
    try:
        content = filepath.read_text(encoding='utf-8')
        
        # Split frontmatter and content
        parts = content.split('---', 2)
        if len(parts) < 3:
            return False, f"Invalid frontmatter structure"
        
        frontmatter = parts[1]
        blog_content = parts[2]
        
        # Clean the blog content
        cleaned_content = clean_content(blog_content)
        
        # Reconstruct file
        new_content = f"---{frontmatter}---\n{cleaned_content}"
        
        # Only write if content changed
        if new_content != content:
            filepath.write_text(new_content, encoding='utf-8')
            return True, "Optimized"
        else:
            return False, "No changes needed"
            
    except Exception as e:
        return False, f"Error: {str(e)}"


def main():
    """Main optimization workflow."""
    project_root = Path(__file__).parent.parent
    blogs_dir = project_root / "src" / "content" / "blogs"
    
    if not blogs_dir.exists():
        print(f"Error: {blogs_dir} not found")
        return
    
    blog_files = list(blogs_dir.glob("*.md"))
    print(f"Found {len(blog_files)} blog files\n")
    
    optimized = 0
    skipped = 0
    errors = 0
    
    for filepath in sorted(blog_files):
        changed, message = process_blog_file(filepath)
        
        if "Error" in message:
            print(f"❌ {filepath.name}: {message}")
            errors += 1
        elif changed:
            print(f"✓ {filepath.name}: {message}")
            optimized += 1
        else:
            skipped += 1
    
    print(f"\n{'='*60}")
    print(f"Optimization Complete!")
    print(f"  Optimized: {optimized}")
    print(f"  Skipped: {skipped}")
    print(f"  Errors: {errors}")
    print(f"  Total: {len(blog_files)}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
