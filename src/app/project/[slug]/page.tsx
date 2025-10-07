import { Metadata } from 'next';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} | Portfolio`,
    description: 'Project details and technical information.',
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}