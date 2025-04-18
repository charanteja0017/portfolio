import { useEffect, useState, useRef } from "react";
import { Users, Clock, MessageSquare, Settings, Code } from "lucide-react";
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
    { name: "Python", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "C", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "C++", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Java", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C#", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "TypeScript", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: ".NET", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
    { name: "Node.js", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Android Studio", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
    { name: "PostgreSQL", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Supabase", imageUrl: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" },
    { name: "SQL", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "AWS", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"}
  ];

  const softSkills = [
    { icon: Settings, title: "Problem-Solving" },
    { icon: Users, title: "Collaboration" },
    { icon: Clock, title: "Time Management" },
    { icon: MessageSquare, title: "Communication" },
    { icon: Code, title: "Critical Thinking" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title transition-all duration-700 ${animated ? 'opacity-100' : 'opacity-0'}`}>
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className={`transition-all duration-700 delay-300 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="glass-card h-full">
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-white/80 mb-6">
                Ever since I was a kid, I've been fascinated by computers — from exploring new software to trying out bits of code, I was always curious. That early interest naturally led me to choose Computer Science as my field of study. With a TS EAMCET rank of 6006, I got into MVSR Engineering College, where I began to truly dive into my passion for coding and developing applications. It was here that I realized how much I enjoy solving problems and bringing ideas to life through technology.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-500 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="glass-card h-full">
              <h3 className="text-2xl font-bold mb-6">Soft Skills</h3>
              <div className="flex flex-wrap gap-4">
                {softSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                    <skill.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm">{skill.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center text-white/90">Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {technologies.map((tech, index) => (
                <TechnologyCard
                  key={index}
                  name={tech.name}
                  imageUrl={tech.imageUrl}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
