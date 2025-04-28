import { useEffect, useState, useRef } from "react";
import { Users, Clock, MessageSquare, Settings, Code, Brain, Lightbulb, Search, Trophy, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import TechnologyCard from "./TechnologyCard";

const About = () => {
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

  const technologies = [
    // Programming Languages
    { name: "TypeScript", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "C++", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "C#", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    
    // Backend & Frameworks
    { name: "Node.js", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: ".NET", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
    
    // Databases
    { name: "PostgreSQL", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "SQL", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Supabase", imageUrl: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" },
    
    // DevOps & Tools
    { name: "Git", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "AWS", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    
    // Mobile Development
    { name: "Android Studio", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
    
    // Design Tools
    { name: "Figma", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Adobe XD", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" }
  ];

  const softSkills = [
    { id: "problem-solving", icon: Settings, title: "Problem-Solving" },
    { id: "collaboration", icon: Users, title: "Collaboration" },
    { id: "time-management", icon: Clock, title: "Time Management" },
    { id: "communication", icon: MessageSquare, title: "Communication" },
    { id: "critical-thinking", icon: Code, title: "Critical Thinking" },
    { id: "adaptability", icon: Brain, title: "Adaptability" },
    { id: "creativity", icon: Lightbulb, title: "Creativity" },
    { id: "attention-to-detail", icon: Search, title: "Attention to Detail" },
    { id: "leadership", icon: Trophy, title: "Leadership" },
    { id: "continuous-learning", icon: BookOpen, title: "Continuous Learning" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title transition-all duration-700 ${animated ? 'opacity-100' : 'opacity-0'}`}>
            About Me
          </h2>
        </div>

        {/* Responsive grid: left = Who I Am, right = Soft Skills + Technologies */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 delay-300 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          {/* Left: Who I Am */}
          <div>
            <div className="glass-card h-full pb-6">
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-white/80 mb-6">
                Ever since I was a kid, I've been driven by an obsession to solve problems and understand how things work — especially computers. I didn't just play with software; I tore into it, debugging errors, experimenting with code snippets, and asking, "How can I make this better?" That curiosity evolved into a love for building solutions that matter.
              </p>
              <p className="text-white/80 mb-6">
                For me, coding is more than logic — it's about translating complex ideas into simple, actionable tools. Whether I'm adapting to new frameworks to meet shifting project goals, breaking down technical concepts for non-developers, or refining code to balance efficiency and scalability, I thrive on turning abstract questions into tangible results.
              </p>
              <p className="text-white/80 mb-6">
                Computer Science became my playground for creative problem-solving, where I could channel my "what if?" mindset into building software that bridges gaps — between users and technology, ideas and execution, or today's challenges and tomorrow's innovations.
              </p>
            </div>
          </div>
          {/* Right: Soft Skills + Technologies */}
          <div className="flex flex-col gap-8">
            <div className="glass-card pb-6">
              <h3 className="text-2xl font-bold mb-6">Soft Skills</h3>
              <div className="flex flex-wrap gap-4">
                {softSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                    <skill.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm">{skill.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card pb-6">
              <h3 className="text-2xl font-bold text-center text-white/90 mb-4">Technologies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {technologies.map((tech) => (
                  <TechnologyCard
                    key={tech.name}
                    name={tech.name}
                    imageUrl={tech.imageUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
