import React, { useState } from 'react';
import { BiomechanicalLabProject } from './projects/biomechanical-lab/BiomechanicalLabProject';

export interface ProjectCard {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
}

export const PORTFOLIO_PROJECTS: ProjectCard[] = [
  {
    id: 'kinelab',
    title: 'KineLab Movement Observatory',
    category: 'Computer Vision & Kinematics',
    description: 'Human movement tracking and biomechanical analysis framework.',
    technologies: ['MediaPipe', 'Three.js', 'React', 'Tailwind']
  },
  {
    id: 'soren-mcp',
    title: 'SOREN MCP Architecture',
    category: 'AI Agent Systems',
    description: 'Model Context Protocol integration for creative technologist workflows.',
    technologies: ['TypeScript', 'Node.js', 'MCP', 'Docker']
  },
  {
    id: 'steppr',
    title: 'Steppr Room',
    category: 'Interactive 3D Space',
    description: 'Spatial 3D environment exploration and architectural lighting study.',
    technologies: ['Spline 3D', 'WebGL', 'Framer Motion']
  },
  {
    id: 'living-resume',
    title: 'Living Résumé Portfolio v8',
    category: 'Motion Systems & WebGL',
    description: 'Six distinct interactive experiences embodying clinical and creative craft.',
    technologies: ['React 19', 'Three.js', 'GSAP', 'Vite']
  },
  {
    id: 'biomech-lab',
    title: 'Biomechanical Cybernetic Lab',
    category: 'Robotics Kinematics & Digital Twin',
    description: 'Real-time digital twin connecting human anatomy with NVIDIA SimReady robotics.',
    technologies: ['R3F', 'NVIDIA SimReady', 'Spline', 'Remotion', 'Hyperframes']
  }
];

export interface SectionExplorerProps {
  initialSection?: string;
}

export const SectionExplorer: React.FC<SectionExplorerProps> = ({
  initialSection = 'projects'
}) => {
  const [activeModalProject, setActiveModalProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">Portfolio Explorations</p>
        <h2 className="text-3xl font-bold tracking-tight text-white">Selected Works & Systems</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO_PROJECTS.map((project) => (
          <article
            key={project.id}
            tabIndex={0}
            onClick={() => setActiveModalProject(project.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModalProject(project.id);
              }
            }}
            className="group relative p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/80 hover:border-sky-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-mono text-sky-400 mb-1">{project.category}</p>
              <h3 className="text-lg font-semibold text-white group-hover:text-sky-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400 mt-2 line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Project 05 Biomechanical Cybernetic Lab Modal */}
      <BiomechanicalLabProject
        isOpen={activeModalProject === 'biomech-lab'}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

export default SectionExplorer;
