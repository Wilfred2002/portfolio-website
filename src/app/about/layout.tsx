import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Wilfred Naraga',
  description: 'Learn about Wilfred Naraga\'s journey from computer science student to passionate full-stack developer. Discover his background, experience, and passion for technology.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
