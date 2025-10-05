import { Metadata } from 'next';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectFilter from '@/components/projects/ProjectFilter';
import { useProjects } from '@/hooks/useProjects';
import ProjectsClient from '@/components/projects/ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'Explore my portfolio of innovative projects spanning web development, AI, and software engineering.',
  openGraph: {
    title: 'Projects | Portfolio',
    description: 'Explore my portfolio of innovative projects spanning web development, AI, and software engineering.',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
