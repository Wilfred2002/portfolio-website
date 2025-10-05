import { Metadata } from 'next';
import SkillsClient from '@/components/skills/SkillsClient';

export const metadata: Metadata = {
  title: 'Skills | Portfolio',
  description: 'Discover my technical skills and expertise across various technologies.',
};

export default function SkillsPage() {
  return <SkillsClient />;
}
