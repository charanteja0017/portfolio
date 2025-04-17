
import { useEffect, useState, useRef } from "react";

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

  const skills = [
    { name: "Web Development", percentage: 95, delay: 100 },
    { name: "UI/UX Design", percentage: 85, delay: 200 },
    { name: "Mobile Development", percentage: 80, delay: 300 },
    { name: "Backend Development", percentage: 90, delay: 400 },
    { name: "DevOps", percentage: 75, delay: 500 },
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
                I'm a passionate developer with expertise in creating modern web applications 
                and digital experiences. With several years of experience in the industry, 
                I've developed a keen eye for design and a strong understanding of user experience.
              </p>
              <p className="text-white/80">
                My goal is to build applications that are not only visually appealing but also 
                functional and user-friendly. I constantly stay updated with the latest technologies
                and best practices to deliver cutting-edge solutions.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-500 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="glass-card h-full">
              <h3 className="text-2xl font-bold mb-6">My Skills</h3>
              {skills.map((skill, index) => (
                <Skill
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  delay={skill.delay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
