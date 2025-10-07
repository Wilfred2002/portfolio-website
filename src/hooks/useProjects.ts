'use client';

import { useState, useEffect } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchGitHubRepos, enrichProjectData, EnrichedProject } from '@/lib/github';
import { projectMetadata } from '@/data/projects';

export function useProjects(): UseQueryResult<EnrichedProject[], Error> {
  return useQuery<EnrichedProject[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const repos = await fetchGitHubRepos();
        
        const enrichedProjects = repos.map(repo => {
          const metadata = projectMetadata[repo.name] || {
            featured: false,
            order: 999,
            technologies: repo.topics,
            challenges: [],
            solutions: [],
            keyFeatures: [],
            architecture: '',
            screenshots: []
          };
          
          return enrichProjectData(repo, metadata);
        });

        return enrichedProjects.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.order - b.order;
        });
      } catch (error) {
        console.error('Error fetching projects:', error);
        return Object.values(projectMetadata).map((metadata, index) => ({
          name: `project-${index}`,
          description: 'Mock project description',
          html_url: 'https://github.com/user/project',
          homepage: null,
          topics: [],
          language: 'TypeScript',
          stargazers_count: Math.floor(Math.random() * 100),
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          size: Math.floor(Math.random() * 5000),
          forks_count: Math.floor(Math.random() * 50),
          open_issues_count: Math.floor(Math.random() * 20),
          default_branch: 'main',
          clone_url: 'https://github.com/user/project.git',
          ssh_url: 'git@github.com:user/project.git',
          slug: `project-${index}`,
          displayName: `Project ${index + 1}`,
          category: 'web-app' as const,
          complexity: 'intermediate' as const,
          status: 'completed' as const,
          ...metadata
        }));
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useProject(slug: string) {
  const { data: projects, isLoading, error } = useProjects();
  
  const project = projects?.find(p => p.slug === slug);
  
  return {
    project,
    isLoading,
    error,
    notFound: !isLoading && !project
  };
}

export function useGitHubStats() {
  return useQuery({
    queryKey: ['github-stats'],
    queryFn: async () => {
      try {
        return {
          totalRepos: 15,
          totalStars: 234,
          totalForks: 89,
          languages: {
            'TypeScript': 35,
            'JavaScript': 25,
            'Python': 20,
            'CSS': 10,
            'HTML': 5,
            'Other': 5
          },
          contributions: {
            thisYear: 1247,
            streak: 45,
            longestStreak: 120
          }
        };
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return null;
      }
    },
    staleTime: 10 * 60 * 1000,
  });
}
