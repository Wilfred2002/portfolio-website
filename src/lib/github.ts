// GitHub API integration for portfolio projects
export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  created_at: string;
  size: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  clone_url: string;
  ssh_url: string;
}

export interface ProjectMetadata {
  featured: boolean;
  order: number;
  thumbnail?: string;
  liveUrl?: string;
  detailedDescription?: string;
  challenges?: string[];
  solutions?: string[];
  keyFeatures?: string[];
  technologies?: string[];
  architecture?: string;
  screenshots?: string[];
  demoUrl?: string;
}

export interface EnrichedProject extends GitHubRepo, ProjectMetadata {
  slug: string;
  displayName: string;
  category: 'web-app' | 'library' | 'tool' | 'experiment';
  complexity: 'simple' | 'intermediate' | 'complex';
  status: 'completed' | 'in-progress' | 'archived';
}

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'your-username';

// Fetch repositories from GitHub API
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    return repos.filter(repo => !repo.name.includes('portfolio') && !repo.name.includes('resume'));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

// Fetch specific repository details
export async function fetchRepoDetails(owner: string, repo: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repo details:', error);
    return null;
  }
}

// Fetch repository topics
export async function fetchRepoTopics(owner: string, repo: string): Promise<string[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/topics`, {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.names || [];
  } catch (error) {
    console.error('Error fetching repo topics:', error);
    return [];
  }
}

// Generate slug from repository name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Determine project category based on repository data
export function determineCategory(repo: GitHubRepo): EnrichedProject['category'] {
  const name = repo.name.toLowerCase();
  const description = repo.description?.toLowerCase() || '';
  const topics = repo.topics.map(t => t.toLowerCase());

  if (topics.includes('web-app') || topics.includes('frontend') || topics.includes('react') || topics.includes('next')) {
    return 'web-app';
  }
  if (topics.includes('library') || topics.includes('package') || topics.includes('npm')) {
    return 'library';
  }
  if (topics.includes('tool') || topics.includes('cli') || topics.includes('utility')) {
    return 'tool';
  }
  if (topics.includes('experiment') || topics.includes('demo') || topics.includes('prototype')) {
    return 'experiment';
  }

  // Fallback based on description and name
  if (description.includes('web') || description.includes('app') || name.includes('web')) {
    return 'web-app';
  }
  if (description.includes('library') || description.includes('package')) {
    return 'library';
  }
  if (description.includes('tool') || description.includes('cli')) {
    return 'tool';
  }

  return 'experiment';
}

// Determine project complexity
export function determineComplexity(repo: GitHubRepo): EnrichedProject['complexity'] {
  const size = repo.size;
  const stars = repo.stargazers_count;
  const forks = repo.forks_count;
  const issues = repo.open_issues_count;

  // Simple scoring system
  let score = 0;
  if (size > 1000) score += 2;
  if (stars > 10) score += 1;
  if (forks > 5) score += 1;
  if (issues > 5) score += 1;

  if (score >= 4) return 'complex';
  if (score >= 2) return 'intermediate';
  return 'simple';
}

// Combine GitHub data with local metadata
export function enrichProjectData(repo: GitHubRepo, metadata: ProjectMetadata): EnrichedProject {
  const slug = generateSlug(repo.name);
  const displayName = repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    ...repo,
    ...metadata,
    slug,
    displayName,
    category: determineCategory(repo),
    complexity: determineComplexity(repo),
    status: 'completed' // Default status
  };
}

// Mock data for development/testing
export const mockProjects: EnrichedProject[] = [
  {
    name: 'task-manager-app',
    description: 'A modern task management application built with React and Node.js',
    html_url: 'https://github.com/user/task-manager-app',
    homepage: 'https://taskmanager.example.com',
    topics: ['react', 'nodejs', 'mongodb', 'web-app'],
    language: 'TypeScript',
    stargazers_count: 25,
    updated_at: '2024-01-15T10:30:00Z',
    created_at: '2023-11-01T08:00:00Z',
    size: 2500,
    forks_count: 8,
    open_issues_count: 3,
    default_branch: 'main',
    clone_url: 'https://github.com/user/task-manager-app.git',
    ssh_url: 'git@github.com:user/task-manager-app.git',
    featured: true,
    order: 1,
    slug: 'task-manager-app',
    displayName: 'Task Manager App',
    category: 'web-app',
    complexity: 'intermediate',
    status: 'completed',
    thumbnail: '/images/task-manager-thumb.jpg',
    liveUrl: 'https://taskmanager.example.com',
    detailedDescription: 'A comprehensive task management solution with real-time collaboration features.',
    challenges: ['Real-time synchronization', 'User authentication', 'Mobile responsiveness'],
    solutions: ['WebSocket implementation', 'JWT-based auth', 'Responsive design patterns'],
    keyFeatures: ['Drag & drop interface', 'Team collaboration', 'Progress tracking', 'Mobile app'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    architecture: 'MERN stack with microservices architecture',
    screenshots: ['/images/task-manager-1.jpg', '/images/task-manager-2.jpg'],
    demoUrl: 'https://demo.taskmanager.example.com'
  },
  {
    name: 'data-visualization-library',
    description: 'A powerful data visualization library for React applications',
    html_url: 'https://github.com/user/data-viz-lib',
    homepage: 'https://www.npmjs.com/package/data-viz-lib',
    topics: ['react', 'typescript', 'd3', 'library', 'visualization'],
    language: 'TypeScript',
    stargazers_count: 150,
    updated_at: '2024-01-20T14:45:00Z',
    created_at: '2023-08-15T12:00:00Z',
    size: 5000,
    forks_count: 25,
    open_issues_count: 12,
    default_branch: 'main',
    clone_url: 'https://github.com/user/data-viz-lib.git',
    ssh_url: 'git@github.com:user/data-viz-lib.git',
    featured: true,
    order: 2,
    slug: 'data-visualization-library',
    displayName: 'Data Visualization Library',
    category: 'library',
    complexity: 'complex',
    status: 'completed',
    thumbnail: '/images/data-viz-thumb.jpg',
    liveUrl: 'https://www.npmjs.com/package/data-viz-lib',
    detailedDescription: 'A comprehensive React library for creating interactive data visualizations.',
    challenges: ['Performance optimization', 'Accessibility compliance', 'Cross-browser compatibility'],
    solutions: ['Virtual rendering', 'ARIA labels', 'Progressive enhancement'],
    keyFeatures: ['Interactive charts', 'Real-time updates', 'Custom themes', 'Accessibility support'],
    technologies: ['React', 'TypeScript', 'D3.js', 'Webpack', 'Jest'],
    architecture: 'Modular component architecture with plugin system',
    screenshots: ['/images/data-viz-1.jpg', '/images/data-viz-2.jpg'],
    demoUrl: 'https://demo.data-viz-lib.example.com'
  }
];

// Filter projects based on criteria
export function filterProjects(
  projects: EnrichedProject[],
  filters: {
    technologies?: string[];
    category?: EnrichedProject['category'];
    complexity?: EnrichedProject['complexity'];
    featured?: boolean;
  }
): EnrichedProject[] {
  return projects.filter(project => {
    if (filters.technologies && filters.technologies.length > 0) {
      const hasTechnology = filters.technologies.some(tech => 
        project.technologies?.includes(tech) || 
        project.topics.includes(tech.toLowerCase())
      );
      if (!hasTechnology) return false;
    }

    if (filters.category && project.category !== filters.category) {
      return false;
    }

    if (filters.complexity && project.complexity !== filters.complexity) {
      return false;
    }

    if (filters.featured !== undefined && project.featured !== filters.featured) {
      return false;
    }

    return true;
  });
}

// Sort projects
export function sortProjects(
  projects: EnrichedProject[],
  sortBy: 'recent' | 'stars' | 'complexity' | 'name'
): EnrichedProject[] {
  return [...projects].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      case 'stars':
        return b.stargazers_count - a.stargazers_count;
      case 'complexity':
        const complexityOrder = { simple: 1, intermediate: 2, complex: 3 };
        return complexityOrder[b.complexity] - complexityOrder[a.complexity];
      case 'name':
        return a.displayName.localeCompare(b.displayName);
      default:
        return 0;
    }
  });
}
