#!/usr/bin/env python3
"""
Deep Agent Validation - Identifies non-agent resources
Removes: lists, directories, collections, notion pages, awesome lists, etc.
"""

import re
from pathlib import Path
from typing import List, Tuple
import frontmatter

# Strict criteria: What makes something an ACTUAL AI agent?
# An AI agent must be:
# 1. A software tool/platform/framework that performs autonomous tasks
# 2. NOT just a list, directory, or collection of other agents
# 3. NOT just documentation or resources about agents
# 4. Has actual functionality (APIs, interfaces, workflows)

NON_AGENT_INDICATORS = {
    'name_patterns': [
        r'\d+\+?\s*(ai|ml|llm)?\s*tools?',  # "500+ AI tools", "100 tools"
        r'list\s+of',
        r'collection\s+of',
        r'directory\s+of',
        r'catalog\s+of',
        r'gallery\s+of',
        r'curated\s+(list|collection)',
        r'awesome[\s-]+(ai|ml|llm|gpt)',  # "awesome-ai-agents" (the list itself)
        r'resources?\s+for',
        r'tools?\s+for',
        r'platforms?\s+for',
        r'frameworks?\s+comparison',
        r'agent[\s-]?directory',
        r'agent[\s-]?list',
        r'ai[\s-]?directory',
        r'ai[\s-]?catalog',
        r'notion\s+page',
        r'notion\s+template',
        r'airtable',
        r'spreadsheet',
        r'database\s+of',
        r'index\s+of',
        r'hub\s+of',
        r'marketplace',
        r'store',
        r'repository\s+of',
    ],
    'description_patterns': [
        r'curated\s+(list|collection)',
        r'comprehensive\s+(list|directory)',
        r'collection\s+of\s+\d+',
        r'list\s+of\s+\d+',
        r'directory\s+listing',
        r'catalog\s+of\s+(ai|ml|llm)',
        r'notion\s+page\s+with',
        r'spreadsheet\s+containing',
        r'database\s+of\s+(ai|ml|llm)',
        r'index\s+of\s+(ai|ml|llm)',
        r'aggregat(es?|ing|or)',
        r'compil(es?|ing|ation)',
        r'gather(s|ing)',
        r'collect(s|ing)',
    ],
    'category_patterns': [
        'directory',
        'directories',
        'catalog',
        'catalogs',
        'marketplace',
        'marketplaces',
        'collection',
        'collections',
        'list',
        'lists',
        'index',
        'repository',
        'repositories',
        'hub',
        'hubs',
        'aggregator',
        'aggregators',
    ]
}

# Additional patterns for generic/template entries
GENERIC_INDICATORS = [
    r'this tool addresses challenges in the',  # Generic template
    r'not publicly specified',  # No real info
]


def is_actual_agent(filepath: Path) -> Tuple[bool, str]:
    """
    Determine if entry is an ACTUAL AI agent (not a list/directory/collection).
    Returns (is_actual_agent, reason_if_not)
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
        
        name = post.get('name', '').lower()
        description = post.get('description', '').lower()
        category = post.get('category', '').lower()
        source_url = post.get('source_url', '').lower()
        
        # Check name patterns
        for pattern in NON_AGENT_INDICATORS['name_patterns']:
            if re.search(pattern, name, re.IGNORECASE):
                return False, f"Name indicates list/directory: '{name}' matches '{pattern}'"
        
        # Check description patterns
        for pattern in NON_AGENT_INDICATORS['description_patterns']:
            if re.search(pattern, description, re.IGNORECASE):
                return False, f"Description indicates collection: matches '{pattern}'"
        
        # Check category
        for cat_pattern in NON_AGENT_INDICATORS['category_patterns']:
            if cat_pattern in category:
                return False, f"Category is '{category}' (non-agent type)"
        
        # Check for Notion pages
        if 'notion.so' in source_url or 'notion.site' in source_url:
            # Notion pages are usually just lists/collections
            if any(keyword in name for keyword in ['list', 'directory', 'collection', 'tools', 'resources']):
                return False, f"Notion page that is a list/directory"
        
        # Check for Airtable (usually directories)
        if 'airtable.com' in source_url:
            return False, "Airtable database (directory/collection)"
        
        # Check for generic template entries
        for pattern in GENERIC_INDICATORS:
            if re.search(pattern, description, re.IGNORECASE):
                # Check if it has any real specific information
                tech_stack = post.get('tech_stack', [])
                if not tech_stack or tech_stack == ['Not publicly specified']:
                    return False, f"Generic template with no real information"
        
        # Check for "awesome" lists that are the list itself (not tools named "awesome-X")
        if name.startswith('awesome-') or name.startswith('awesome '):
            # Check if description indicates it's a list
            if any(word in description for word in ['list', 'collection', 'curated', 'resources', 'directory']):
                return False, f"Awesome list (collection of resources)"
        
        return True, ""
        
    except Exception as e:
        print(f"Error reading {filepath.name}: {e}")
        return True, ""  # Default to keeping if error


def analyze_agents(agents_dir: Path) -> dict:
    """Analyze all agents for actual agent vs list/directory."""
    all_files = list(agents_dir.glob('*.md'))
    
    results = {
        'total': len(all_files),
        'actual_agents': [],
        'non_agents': [],
        'errors': []
    }
    
    for filepath in all_files:
        try:
            is_agent, reason = is_actual_agent(filepath)
            if is_agent:
                results['actual_agents'].append(filepath.name)
            else:
                results['non_agents'].append({
                    'file': filepath.name,
                    'reason': reason
                })
        except Exception as e:
            results['errors'].append({
                'file': filepath.name,
                'error': str(e)
            })
    
    return results


def main():
    """Main analysis workflow."""
    project_root = Path(__file__).parent.parent
    agents_dir = project_root / "src" / "content" / "agents"
    
    if not agents_dir.exists():
        print(f"Error: {agents_dir} not found")
        return
    
    print("Deep Agent Validation Analysis")
    print(f"{'='*60}\n")
    print("Identifying non-agent resources (lists, directories, collections)...\n")
    
    results = analyze_agents(agents_dir)
    
    print(f"Total files: {results['total']}")
    print(f"Actual AI agents: {len(results['actual_agents'])}")
    print(f"Non-agents (lists/directories): {len(results['non_agents'])}")
    print(f"Errors: {len(results['errors'])}\n")
    
    if results['non_agents']:
        print(f"{'='*60}")
        print("NON-AGENT RESOURCES TO REMOVE:")
        print(f"{'='*60}\n")
        
        # Group by reason
        by_reason = {}
        for item in results['non_agents']:
            reason = item['reason'].split(':')[0]  # Get category
            if reason not in by_reason:
                by_reason[reason] = []
            by_reason[reason].append(item['file'])
        
        for reason, files in sorted(by_reason.items()):
            print(f"\n{reason} ({len(files)} files):")
            for f in sorted(files)[:15]:  # Show first 15
                print(f"  - {f}")
            if len(files) > 15:
                print(f"  ... and {len(files) - 15} more")
    
    # Ask for confirmation
    print(f"\n{'='*60}")
    print(f"Ready to remove {len(results['non_agents'])} non-agent resources")
    print(f"This will keep {len(results['actual_agents'])} actual AI agents")
    print(f"{'='*60}\n")
    
    response = input("Proceed with deletion? (yes/no): ").strip().lower()
    
    if response == 'yes':
        deleted = 0
        for item in results['non_agents']:
            filepath = agents_dir / item['file']
            try:
                filepath.unlink()
                deleted += 1
                if deleted % 50 == 0:
                    print(f"Deleted {deleted}/{len(results['non_agents'])}...")
            except Exception as e:
                print(f"Error deleting {item['file']}: {e}")
        
        print(f"\n{'='*60}")
        print(f"Deep validation complete!")
        print(f"  Deleted: {deleted} non-agent resources")
        print(f"  Remaining: {len(results['actual_agents'])} actual AI agents")
        print(f"{'='*60}\n")
    else:
        print("Deletion cancelled.")
        
        # Save report
        report_path = project_root / "deep_agent_validation_report.txt"
        with open(report_path, 'w') as f:
            f.write(f"Deep Agent Validation Report\n")
            f.write(f"{'='*60}\n\n")
            f.write(f"Total files: {results['total']}\n")
            f.write(f"Actual agents: {len(results['actual_agents'])}\n")
            f.write(f"Non-agents: {len(results['non_agents'])}\n\n")
            f.write(f"Files to remove:\n")
            for item in results['non_agents']:
                f.write(f"  {item['file']} - {item['reason']}\n")
        
        print(f"Report saved to: {report_path}")


if __name__ == "__main__":
    main()
