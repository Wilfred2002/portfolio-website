import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Portfolio | Computer Science Graduate',
  description: 'A modern portfolio showcasing innovative projects and technical expertise in full-stack development, AI, and software engineering.',
};

export default function HomePage() {
  return <HomePageClient />;
}