'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { skillNodeVariants } from '@/lib/animations';
import { skillsData } from '@/data/projects';

interface SkillNode {
  id: string;
  name: string;
  level: number;
  category: string;
  x: number;
  y: number;
  relatedSkills: string[];
  projects: string[];
}

interface Connection {
  from: string;
  to: string;
  strength: number;
}

export default function SkillConstellation() {
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateConstellation();
  }, []);

  const generateConstellation = () => {
    const skillNodes: SkillNode[] = [];
    const skillConnections: Connection[] = [];
    
    const frontendSkills = ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Tailwind CSS'];
    const backendSkills = ['Node.js', 'PostgreSQL', 'Stripe', 'Solidity', 'C++', 'Lua'];
    
    const frontendLevel = Math.round(
      frontendSkills.reduce((sum, skill) => {
        const skillData = skillsData[skill as keyof typeof skillsData];
        return sum + (skillData?.level || 0);
      }, 0) / frontendSkills.length
    );
    
    skillNodes.push({
      id: 'frontend',
      name: 'Frontend',
      level: frontendLevel,
      category: 'Frontend',
      x: -150,
      y: 0,
      relatedSkills: frontendSkills,
      projects: ['seoul-website', 'hearing-loss-website', 'pokemon-ecommerce', 'manga-king']
    });
    
    const backendLevel = Math.round(
      backendSkills.reduce((sum, skill) => {
        const skillData = skillsData[skill as keyof typeof skillsData];
        return sum + (skillData?.level || 0);
      }, 0) / backendSkills.length
    );
    
    skillNodes.push({
      id: 'backend',
      name: 'Backend',
      level: backendLevel,
      category: 'Backend',
      x: 150,
      y: 0,
      relatedSkills: backendSkills,
      projects: ['pokemon-ecommerce', 'monad-mcp-server', 'csgo-aimbot']
    });

    skillConnections.push({
      from: 'frontend',
      to: 'backend',
      strength: 0.8
    });

    setNodes(skillNodes);
    setConnections(skillConnections);
  };

  const getNodeColor = (category: string) => {
    const colors = {
      'Frontend': '#8b5cf6',
      'Backend': '#06b6d4'
    };
    return colors[category as keyof typeof colors] || '#6366f1';
  };

  const getNodeSize = (level: number) => {
    return Math.max(20, level * 3);
  };

  const centerX = 400;
  const centerY = 300;

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold mb-4">Skills Map</h2>
        <p className="text-muted-foreground">
          Click to see related technologies
        </p>
      </div>

      <div ref={containerRef} className="relative w-full h-[600px] overflow-hidden">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          className="absolute inset-0"
        >
          {/* Connections */}
          {connections.map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from);
            const toNode = nodes.find(n => n.id === connection.to);
            
            if (!fromNode || !toNode) return null;

            const isHighlighted = hoveredNode === connection.from || hoveredNode === connection.to;
            
            return (
              <motion.line
                key={index}
                x1={centerX + fromNode.x}
                y1={centerY + fromNode.y}
                x2={centerX + toNode.x}
                y2={centerY + toNode.y}
                stroke={isHighlighted ? getNodeColor(fromNode.category) : '#374151'}
                strokeWidth={isHighlighted ? 2 : 1}
                opacity={isHighlighted ? 0.8 : 0.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, index) => (
            <motion.g
              key={node.id}
              variants={skillNodeVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <motion.circle
                cx={centerX + node.x}
                cy={centerY + node.y}
                r={getNodeSize(node.level)}
                fill={getNodeColor(node.category)}
                stroke={hoveredNode === node.id ? '#ffffff' : 'transparent'}
                strokeWidth={hoveredNode === node.id ? 2 : 0}
                className="cursor-pointer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              
              {/* Node label */}
              <motion.text
                x={centerX + node.x}
                y={centerY + node.y + 5}
                textAnchor="middle"
                className="text-xs fill-white font-medium pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredNode === node.id ? 1 : 0.7 }}
              >
                {node.name}
              </motion.text>
            </motion.g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute top-4 right-4 glass rounded-lg border border-white/10 p-4">
          <h3 className="text-sm font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {Array.from(new Set(nodes.map(n => n.category))).map(category => (
              <div key={category} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: getNodeColor(category) }}
                />
                <span className="text-xs text-muted-foreground">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Node Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8"
          >
            <Card className="glass border-white/10">
              <CardContent className="p-6">
                {(() => {
                  const node = nodes.find(n => n.id === selectedNode);
                  if (!node) return null;
                  
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">{node.name}</h3>
                        <Badge variant="outline">{node.category}</Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {node.relatedSkills.map((skill: string) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Projects</h4>
                          <div className="flex flex-wrap gap-2">
                            {node.projects.map((project: string) => (
                              <Badge key={project} variant="outline" className="text-xs">
                                {project}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
