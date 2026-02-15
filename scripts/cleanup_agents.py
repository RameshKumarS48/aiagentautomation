#!/usr/bin/env python3
"""
Agent Directory Cleanup Script
Removes non-AI-agent entries (datasets, tutorials, papers, guides, etc.)
Keeps only actual AI agents and tools
"""

import re
from pathlib import Path
from typing import List, Tuple
import frontmatter

# Patterns that indicate NON-agent content
NON_AGENT_PATTERNS = {
    'filename': [
        r'dataset', r'tutorial', r'guide', r'introduction-to', r'getting-started',
        r'your-guide', r'learning', r'course', r'book', r'paper', r'research-on',
        r'understanding', r'explained', r'basics-of', r'overview-of', r'roadmap',
        r'references', r'interview-questions', r'mastery', r'handbook', r'cookbook',
        r'from-scratch', r'beginner', r'advanced', r'series', r'blog', r'articles',
        r'awesome-.*-papers', r'awesome-.*-datasets', r'gallery-of', r'collection-of',
        r'list-of', r'catalog-of', r'search-beta', r'torrents', r'job-postings',
        r'images-of', r'projects-ideas', r'alternatives', r'best-.*-alternatives',
        r'data-science-projects', r'analytics-projects', r'ml-projects'
    ],
    'category': [
        'datasets', 'credits', 'tutorials', 'courses', 'books', 'papers',
        'research', 'learning resources', 'documentation', 'guides'
    ],
    'name_keywords': [
        'dataset', 'tutorial', 'guide', 'course', 'book', 'paper', 'handbook',
        'cookbook', 'roadmap', 'interview questions', 'blog', 'articles',
        'collection', 'catalog', 'gallery', 'awesome list', 'job postings',
        'torrents', 'images of', 'projects ideas'
    ]
}

# Patterns that indicate ACTUAL agents
AGENT_INDICATORS = [
    'agent', 'gpt', 'ai assistant', 'chatbot', 'automation', 'workflow',
    'autonomous', 'llm', 'model', 'api', 'platform', 'tool', 'framework',
    'bot', 'copilot', 'assistant'
]


def is_non_agent(filepath: Path) -> Tuple[bool, str]:
    """
    Determine if a file is NOT an AI agent.
    Returns (is_non_agent, reason)
    """
    filename = filepath.stem.lower()
    
    # Check filename patterns
    for pattern in NON_AGENT_PATTERNS['filename']:
        if re.search(pattern, filename):
            return True, f"Filename matches pattern: {pattern}"
    
    # Read frontmatter
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
            
        category = post.get('category', '').lower()
        name = post.get('name', '').lower()
        description = post.get('description', '').lower()
        
        # Check category
        for non_agent_cat in NON_AGENT_PATTERNS['category']:
            if non_agent_cat in category:
                return True, f"Category: {category}"
        
        # Check name keywords
        for keyword in NON_AGENT_PATTERNS['name_keywords']:
            if keyword in name:
                # Double-check if it's actually an agent
                has_agent_indicator = any(ind in name or ind in description 
                                         for ind in AGENT_INDICATORS)
                if not has_agent_indicator:
                    return True, f"Name contains: {keyword}"
        
        # Check if description is too generic (template-like)
        if 'this tool addresses challenges in the' in description:
            # This is the generic template - likely not a real agent
            # Check if it has any real agent indicators
            has_agent_indicator = any(ind in name.lower() for ind in AGENT_INDICATORS)
            if not has_agent_indicator and category in NON_AGENT_PATTERNS['category']:
                return True, f"Generic template + non-agent category: {category}"
                
    except Exception as e:
        print(f"Error reading {filepath.name}: {e}")
        return False, ""
    
    return False, ""


def analyze_agents_directory(agents_dir: Path) -> dict:
    """Analyze all agent files and categorize them."""
    all_files = list(agents_dir.glob('*.md'))
    
    results = {
        'total': len(all_files),
        'non_agents': [],
        'agents': [],
        'errors': []
    }
    
    for filepath in all_files:
        try:
            is_invalid, reason = is_non_agent(filepath)
            if is_invalid:
                results['non_agents'].append({
                    'file': filepath.name,
                    'reason': reason
                })
            else:
                results['agents'].append(filepath.name)
        except Exception as e:
            results['errors'].append({
                'file': filepath.name,
                'error': str(e)
            })
    
    return results


def main():
    """Main cleanup workflow."""
    project_root = Path(__file__).parent.parent
    agents_dir = project_root / "src" / "content" / "agents"
    
    if not agents_dir.exists():
        print(f"Error: {agents_dir} not found")
        return
    
    print("Analyzing agent directory...")
    print(f"{'='*60}\n")
    
    results = analyze_agents_directory(agents_dir)
    
    print(f"Total files: {results['total']}")
    print(f"Valid agents: {len(results['agents'])}")
    print(f"Non-agents to remove: {len(results['non_agents'])}")
    print(f"Errors: {len(results['errors'])}\n")
    
    if results['non_agents']:
        print(f"{'='*60}")
        print("NON-AGENT ENTRIES TO REMOVE:")
        print(f"{'='*60}\n")
        
        # Group by reason
        by_reason = {}
        for item in results['non_agents']:
            reason = item['reason']
            if reason not in by_reason:
                by_reason[reason] = []
            by_reason[reason].append(item['file'])
        
        for reason, files in sorted(by_reason.items()):
            print(f"\n{reason} ({len(files)} files):")
            for f in sorted(files)[:10]:  # Show first 10
                print(f"  - {f}")
            if len(files) > 10:
                print(f"  ... and {len(files) - 10} more")
    
    # Ask for confirmation before deleting
    print(f"\n{'='*60}")
    print(f"Ready to remove {len(results['non_agents'])} non-agent files")
    print(f"This will keep {len(results['agents'])} valid agent files")
    print(f"{'='*60}\n")
    
    response = input("Proceed with deletion? (yes/no): ").strip().lower()
    
    if response == 'yes':
        deleted = 0
        for item in results['non_agents']:
            filepath = agents_dir / item['file']
            try:
                filepath.unlink()
                deleted += 1
                if deleted % 100 == 0:
                    print(f"Deleted {deleted}/{len(results['non_agents'])}...")
            except Exception as e:
                print(f"Error deleting {item['file']}: {e}")
        
        print(f"\n{'='*60}")
        print(f"Cleanup complete!")
        print(f"  Deleted: {deleted} files")
        print(f"  Remaining: {len(results['agents'])} agent files")
        print(f"{'='*60}\n")
    else:
        print("Deletion cancelled.")
        
        # Save report
        report_path = project_root / "agent_cleanup_report.txt"
        with open(report_path, 'w') as f:
            f.write(f"Agent Directory Cleanup Report\n")
            f.write(f"{'='*60}\n\n")
            f.write(f"Total files: {results['total']}\n")
            f.write(f"Valid agents: {len(results['agents'])}\n")
            f.write(f"Non-agents: {len(results['non_agents'])}\n\n")
            f.write(f"Files to remove:\n")
            for item in results['non_agents']:
                f.write(f"  {item['file']} - {item['reason']}\n")
        
        print(f"Report saved to: {report_path}")


if __name__ == "__main__":
    main()
