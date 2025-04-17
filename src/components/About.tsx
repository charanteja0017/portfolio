
import { useEffect, useState, useRef } from "react";
import { Code, Settings, Users, Clock, MessageSquare, School, Database } from "lucide-react";

interface SkillProps {
  name: string;
  percentage: number;
  delay: number;
}

const Skill = ({ name, percentage, delay }: SkillProps) => {
  const [width, setWidth] = useState(0);
  const skillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth(percentage);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current);
      }
    };
  }, [percentage, delay]);

  return (
    <div ref={skillRef} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-primary">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

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

  const techSkills = [
    { name: "Angular", percentage: 85, delay: 100 },
    { name: "ASP.NET", percentage: 80, delay: 200 },
    { name: "Web Technologies", percentage: 90, delay: 300 },
    { name: "C# & C++", percentage: 85, delay: 400 },
    { name: "Database Management", percentage: 75, delay: 500 },
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className={`transition-all duration-700 delay-300 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="glass-card h-full">
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-white/80 mb-6">
                I am a Computer Science Engineering graduate from MVSR Engineering College with a strong passion 
                for software development and problem-solving. A computer enthusiast since childhood, I enjoy learning 
                new technologies and building efficient solutions.
              </p>
              <p className="text-white/80">
                Currently working as a Full-Stack Developer at Hebeon Technologies, I develop scalable applications 
                using Angular and ASP.NET, focusing on creating robust and user-friendly software solutions.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-500 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="glass-card h-full">
              <h3 className="text-2xl font-bold mb-6">My Skills</h3>
              {techSkills.map((skill, index) => (
                <Skill
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  delay={skill.delay}
                />
              ))}
              <div className="mt-6 flex flex-wrap gap-4">
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
      </div>
    </section>
  );
};

export default About;
