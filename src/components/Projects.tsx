
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
}

const Project = ({ title, description, image, tags, githubUrl, liveUrl, index }: ProjectProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-card overflow-hidden group animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark/80 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark/80 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span 
            key={i} 
            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects = [
    {
      title: "SudokoS",
      description: "A Java-based Sudoku solver that utilizes recursive backtracking algorithms to solve puzzles efficiently.",
      image: "https://enakano.github.io/projects/Sudoku%20Solver/sudoku_solver.png",
      tags: ["Java", "Algorithms", "Backtracking"],
      githubUrl: "https://github.com/charanteja0017/SudokoS",
      liveUrl: "#",
    },
    {
      title: "ImagetoPolkaDots",
      description: "A Python application that converts images into polka dot representations using image processing techniques.",
      image: "https://pouch.jumpshare.com/preview/j2HQp10LpupGnArCSgsHzvcjXgvCXxGVdpsnh6S7AhQ7H3OYA93oAFFYO36zQX5CTonTAmGYQGxlro2bRIFwdveUf_dG3LLZN5BkzXJ43dE",
      tags: ["Python", "OpenCV", "Image Processing"],
      githubUrl: "https://github.com/charanteja0017/ImagetoPolkaDots",
      liveUrl: "https://imagetopolkadots.charanteja0017.in/",
    },
    {
      title: "DeepLearningExamples",
      description: "A fork of NVIDIA's repository containing state-of-the-art deep learning scripts for various models, optimized for performance.",
      image: "https://developer.nvidia.com/sites/default/files/akamai/developer-blogs/2020/DeepLearningExamples.png",
      tags: ["PyTorch", "TensorFlow", "NVIDIA", "Deep Learning"],
      githubUrl: "https://github.com/charanteja0017/DeepLearningExamples",
      liveUrl: "#",
    },
    {
      title: "Radiant Glass Flow",
      description: "A TypeScript-based web application scaffolded with Vite and styled using Tailwind CSS, demonstrating modern frontend development practices.",
      image: "https://vitejs.dev/logo-with-shadow.png",
      tags: ["TypeScript", "Vite", "Tailwind CSS"],
      githubUrl: "https://github.com/charanteja0017/radiant-glass-flow",
      liveUrl: "https://lovable.dev/projects/b65f124e-8d64-4f68-9bc8-f68d8df6e639",
    },
  ];
  

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title transition-all duration-700 ${animated ? 'opacity-100' : 'opacity-0'}`}>
            My Projects
          </h2>
          <p className={`text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-300 ${animated ? 'opacity-100' : 'opacity-0'}`}>
            Here are some of my recent projects. Each project was selected to showcase different skills and technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Project
              key={index}
              index={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
