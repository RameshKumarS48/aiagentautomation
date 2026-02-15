#!/usr/bin/env python3
"""
Comprehensive Agent Validator - Strict filtering
Only keeps ACTUAL AI agents by traditional definition:
- Software that autonomously performs tasks for users
- Has a working product/tool/platform
- NOT: Twitter profiles, Wikipedia pages, ML algorithms, frameworks,
  programming libraries, bloggers, YouTube channels, etc.
"""

import re
from pathlib import Path
from urllib.parse import urlparse
import frontmatter

# ===== INVALID URL DOMAINS =====
# These are NOT AI agent sources
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
    
    # Video platforms (not agents)
    'www.youtube.com', 'youtube.com', 'youtu.be',
    'vimeo.com', 'www.vimeo.com',
    
    # Package registries (libraries, not agents)
    'cran.r-project.org',  # R packages
    'godoc.org',  # Go docs
    'pypi.org',  # Python packages (unless it IS an agent)
    'rubygems.org',
    'www.npmjs.com', 'npmjs.com',
    'packagist.org',
    'crates.io',
    'mvnrepository.com',
    'nuget.org',
    'cocoapods.org',
    'metacpan.org',
    
    # Code hosting without specific repos (profiles)
    'sourceforge.net',
    'bitbucket.org',
    'gitlab.com',
    
    # Academic sites (not agents)
    'nlp.stanford.edu',
    'cs.stanford.edu',
    'www.cs.cmu.edu',
    'people.csail.mit.edu',
    
    # Stats/Analytics company pages (not agents)
    'www.sas.com',
    
    # Forums
    'news.ycombinator.com',
    'stackoverflow.com',
    
    # Google services (generic)
    'code.google.com',
    'sites.google.com',
}

# ===== INVALID CATEGORIES =====
# Categories that indicate non-agent content
INVALID_CATEGORIES = {
    # Programming languages (libraries, not agents)
    'python', 'r', 'javascript', 'java', 'c', 'c++', 'c#',
    'go', 'julia', 'clojure', 'scala', 'perl', 'ruby', 'lua',
    'rust', 'haskell', 'swift', 'kotlin', 'elixir', 'erlang',
    'matlab', 'octave', 'lisp', 'fortran', 'crystal',
    
    # Generic ML/DL categories (libraries/algorithms, not agents)
    'deep learning packages', 'general machine learning packages',
    'industry strength reinforcement learning',
    'industry strength natural language processing',
    'computation and communication optimisation',
    'natural language processing packages',
    'neural network packages', 'signal processing packages',
    'data manipulation packages',
    
    # People/Content (not agents)
    'bloggers', 'podcasts', 'podcasters',
    'researchers', 'influencers', 'educators',
    
    # Non-agent content types
    'comparison', 'contents', 'services',
    'llm leaderboard', 'rankings',
    
    # Hardware/Infrastructure
    'hardware', 'infrastructure',
    
    # Already cleaned but might remain
    'credits', 'documentation', 'notebooks',
    'datasets', 'tutorials', 'courses',
    'books', 'papers', 'research papers',
    'other papers', 'lists', 'more lists',
    'other awesome lists', 'related awesome lists',
    'complement to this list', 'videos playlists',
    'index', 'github groups',
}

# ===== INVALID NAME PATTERNS =====
# Names that indicate non-agent content
INVALID_NAME_PATTERNS = [
    # ML Algorithms (not agents)
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
    r'^(hidden\s*markov)',
    r'^(reinforcement\s*learning)',
    r'^(q-?learning)',
    r'^(monte\s*carlo)',
    r'^(backpropagation)',
    r'^(word2vec|glove|fasttext)',
    r'^(batch\s*normalization)',
    r'^(dropout|regularization)',
    r'^(cross[\s-]?validation)',
    r'^(confusion\s*matrix)',
    r'^(precision[\s-]?recall)',
    r'^(f1[\s-]?score)',
    r'^(roc[\s-]?curve|auc)',
    
    # Generic libraries/frameworks (not agents)
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

# ===== INVALID SOURCE URL PATTERNS =====
INVALID_URL_PATTERNS = [
    r'twitter\.com/\w+$',      # Twitter profiles
    r'x\.com/\w+$',            # X profiles
    r'facebook\.com/',         # Facebook pages
    r'linkedin\.com/',         # LinkedIn profiles
    r'youtube\.com/(watch|channel|@)',  # YouTube videos/channels
    r'reddit\.com/r/',         # Reddit subreddits
    r'wikipedia\.org/',        # Wikipedia articles
    r'slideshare\.net/',       # Slideshare presentations
    r'arxiv\.org/',            # Research papers
    r'medium\.com/@',          # Medium blog posts
    r'cran\.r-project\.org/',  # R packages
    r'godoc\.org/',            # Go packages
    r'sourceforge\.net/',      # SourceForge projects
]


def validate_agent(filepath: Path) -> tuple:
    """
    Strictly validate if entry is an ACTUAL AI agent.
    Returns (is_valid, reason_if_invalid)
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
        
        name = post.get('name', '').strip()
        name_lower = name.lower()
        category = post.get('category', '').strip().lower()
        source_url = post.get('source_url', '').strip()
        description = post.get('description', '').strip().lower()
        tech_stack = post.get('tech_stack', [])
        
        # 1. Check URL domain
        if source_url:
            parsed = urlparse(source_url)
            domain = parsed.netloc.lower()
            
            if domain in INVALID_DOMAINS:
                return False, f"Invalid domain: {domain} ({source_url})"
            
            # Check URL patterns
            for pattern in INVALID_URL_PATTERNS:
                if re.search(pattern, source_url, re.IGNORECASE):
                    return False, f"Invalid URL pattern: {source_url}"
        else:
            # No URL at all
            return False, "No source URL"
        
        # 2. Check category
        if category in INVALID_CATEGORIES:
            return False, f"Invalid category: {category}"
        
        # 3. Check name patterns
        for pattern in INVALID_NAME_PATTERNS:
            if re.search(pattern, name_lower, re.IGNORECASE):
                return False, f"Name matches non-agent pattern: {name}"
        
        # 4. Check for generic template with no real info
        if 'this tool addresses challenges in the' in description:
            if (not tech_stack or tech_stack == ['Not publicly specified']) and \
               (category in INVALID_CATEGORIES or not source_url):
                return False, f"Generic template with no info"
        
        return True, ""
        
    except Exception as e:
        return True, ""  # Keep on error


def main():
    project_root = Path(__file__).parent.parent
    agents_dir = project_root / "src" / "content" / "agents"
    
    if not agents_dir.exists():
        print(f"Error: {agents_dir} not found")
        return
    
    files = list(agents_dir.glob('*.md'))
    
    print("Comprehensive Agent Validation")
    print(f"{'='*60}\n")
    
    valid = []
    invalid = []
    
    for f in files:
        is_valid, reason = validate_agent(f)
        if is_valid:
            valid.append(f.name)
        else:
            invalid.append({'file': f.name, 'reason': reason})
    
    print(f"Total files: {len(files)}")
    print(f"Valid AI agents: {len(valid)}")
    print(f"Invalid (to remove): {len(invalid)}")
    
    # Group by reason category
    by_category = {}
    for item in invalid:
        # Extract category from reason
        if 'Invalid domain' in item['reason']:
            cat = 'Invalid URL domain'
        elif 'Invalid URL pattern' in item['reason']:
            cat = 'Invalid URL pattern'
        elif 'Invalid category' in item['reason']:
            cat = 'Invalid category: ' + item['reason'].split(': ')[1]
        elif 'Name matches' in item['reason']:
            cat = 'ML algorithm / Library'
        elif 'No source URL' in item['reason']:
            cat = 'No source URL'
        elif 'Generic template' in item['reason']:
            cat = 'Generic template'
        else:
            cat = 'Other'
        
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append(item)
    
    print(f"\n{'='*60}")
    print("BREAKDOWN BY ISSUE TYPE:")
    print(f"{'='*60}\n")
    
    for cat, items in sorted(by_category.items(), key=lambda x: -len(x[1])):
        print(f"\n{cat} ({len(items)} files):")
        for item in sorted(items, key=lambda x: x['file'])[:10]:
            print(f"  - {item['file']}")
            print(f"    Reason: {item['reason']}")
        if len(items) > 10:
            print(f"  ... and {len(items) - 10} more")
    
    # Prompt for deletion
    print(f"\n{'='*60}")
    print(f"Ready to remove {len(invalid)} non-agent entries")
    print(f"This will keep {len(valid)} actual AI agents")
    print(f"{'='*60}\n")
    
    response = input("Proceed with deletion? (yes/no): ").strip().lower()
    
    if response == 'yes':
        deleted = 0
        for item in invalid:
            filepath = agents_dir / item['file']
            try:
                filepath.unlink()
                deleted += 1
                if deleted % 100 == 0:
                    print(f"Deleted {deleted}/{len(invalid)}...")
            except Exception as e:
                print(f"Error deleting {item['file']}: {e}")
        
        print(f"\nDone! Deleted {deleted} non-agent entries")
        print(f"Remaining: {len(valid)} actual AI agents")
    else:
        print("Cancelled. Saving report...")
        report_path = project_root / "comprehensive_validation_report.txt"
        with open(report_path, 'w') as f:
            f.write(f"Comprehensive Agent Validation Report\n")
            f.write(f"{'='*60}\n\n")
            f.write(f"Total: {len(files)} | Valid: {len(valid)} | Invalid: {len(invalid)}\n\n")
            for cat, items in sorted(by_category.items(), key=lambda x: -len(x[1])):
                f.write(f"\n{cat} ({len(items)} files):\n")
                for item in sorted(items, key=lambda x: x['file']):
                    f.write(f"  {item['file']} - {item['reason']}\n")
        print(f"Report saved to: {report_path}")


if __name__ == "__main__":
    main()
