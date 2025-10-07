'use client';

import { motion } from 'framer-motion';
import { Code, GraduationCap, Briefcase, Heart, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              About Wilfred
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Computer Science Graduate passionate about creating innovative solutions 
            through clean code and thoughtful design.
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Story */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass border-white/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <Heart className="w-6 h-6 mr-3 text-primary" />
                    My Journey
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      My journey in technology began at West Chester University of Pennsylvania, where I pursued 
                      my Bachelor of Science in Computer Science.
                    </p>
                    <p>
                      Through my experience, I&apos;ve had the opportunity to work on diverse projects 
                      that span from restaurant websites driving customer acquisition growth to accessibility-focused 
                      development for the Hearing Loss Association. Each project has taught me the importance of 
                      understanding both technical challenges and user needs.
                    </p>
                    <p>
                      I&apos;m proficient across both frontend and backend development—building responsive React/TypeScript interfaces and reliable Node.js/.NET services—and I have foundational experience writing smart contracts in Solidity for on-chain workflows. I enjoy shipping end-to-end features that bridge great UX with solid engineering.
                    </p>
                    <p>
                      When I&apos;m not coding, you&apos;ll find me traveling, gaming, or reading manga!
                      If you want to connect with me, you can find me on LinkedIn or send me an email!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Education & Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-secondary" />
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                      <p className="text-sm text-muted-foreground">West Chester University of Pennsylvania</p>
                      <p className="text-sm text-muted-foreground">Focus: Software Engineering & Web Development</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-accent" />
                    Experience
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Front End Engineer</h4>
                      <p className="text-sm text-muted-foreground">Seoul Restaurant (Sep 2024 - Jun 2025)</p>
                      <p className="text-sm text-muted-foreground">Drove 80% customer acquisition growth</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Front-End Developer</h4>
                      <p className="text-sm text-muted-foreground">Hearing Loss Association (Aug 2024 - Jan 2025)</p>
                      <p className="text-sm text-muted-foreground">Accessibility-focused web development</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Engineering Intern</h4>
                      <p className="text-sm text-muted-foreground">Lua Engineering (Jun 2023 - Jul 2023)</p>
                      <p className="text-sm text-muted-foreground">Game development with Lua scripting</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Skills & Contact */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-primary" />
                    Core Skills
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Frontend</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">React</Badge>
                        <Badge variant="outline" className="text-xs">TypeScript</Badge>
                        <Badge variant="outline" className="text-xs">Next.js</Badge>
                        <Badge variant="outline" className="text-xs">Tailwind CSS</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Backend</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Node.js</Badge>
                        <Badge variant="outline" className="text-xs">Python</Badge>
                        <Badge variant="outline" className="text-xs">Express</Badge>
                        <Badge variant="outline" className="text-xs">MongoDB</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Tools & Others</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Git</Badge>
                        <Badge variant="outline" className="text-xs">Docker</Badge>
                        <Badge variant="outline" className="text-xs">AWS</Badge>
                        <Badge variant="outline" className="text-xs">Figma</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass border-white/10">
                <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Let&apos;s Connect</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="https://github.com/Wilfred2002" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="https://linkedin.com/in/wilfrednaraga" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="mailto:wilfrednaraga@example.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
