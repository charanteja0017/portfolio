
import { useEffect, useRef, useState } from "react";
import { Building, Calendar } from "lucide-react";

interface ExperienceItemProps {
  company: string;
  position: string;
  period: string;
  description: string[];
  index: number;
  inView: boolean;
}

const ExperienceItem = ({ company, position, period, description, index, inView }: ExperienceItemProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <div 
      className={`relative transition-all duration-700 ${
        inView 
          ? 'opacity-100' 
          : 'opacity-0'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="absolute top-0 left-[calc(50%-0.5rem)] w-4 h-4 rounded-full bg-primary z-10"></div>
      
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-primary/30 -translate-x-1/2 z-0"></div>
      
      <div 
        className={`mx-auto glass-card w-full md:w-[calc(50%-2rem)] md:ml-auto md:mr-0 ${
          isEven ? 'md:ml-0 md:mr-auto' : ''
        }`}
      >
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <h3 className="text-xl font-bold text-white">{position}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-1 text-primary">
          <Building className="w-4 h-4" />
          <span className="text-sm">{company}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4 text-white/60">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{period}</span>
        </div>
        
        <ul className="text-white/80 list-disc pl-5 space-y-2">
          {description.map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
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

  const experiences = [
    {
      company: "Hebeon Technologies",
      position: "Full Stack Developer",
      period: "April 2023 - October 2023",
      description: [
        "Developed a Chrome-based extension for exam proctoring, enhancing security and monitoring capabilities.",
        "Implemented real-time notifications to improve user engagement and responsiveness.",
        "Designed and integrated interview experience features, optimizing user workflows.",
        "Built a scalable backend using ASP.NET for efficient data processing and management.",
        "Developed a dynamic frontend with Angular, ensuring a smooth and interactive user experience."
      ],
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            Professional Experience
          </h2>
          <p className={`text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            My journey of professional growth and technological innovation.
          </p>
        </div>

        <div className="relative space-y-12 py-8">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              index={index}
              company={exp.company}
              position={exp.position}
              period={exp.period}
              description={exp.description}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
