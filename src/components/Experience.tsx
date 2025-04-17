
import { useEffect, useRef, useState } from "react";
import { Building, Calendar } from "lucide-react";

interface ExperienceItemProps {
  company: string;
  position: string;
  period: string;
  description: string;
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
      {/* Timeline dot */}
      <div className="absolute top-0 left-[calc(50%-0.5rem)] w-4 h-4 rounded-full bg-primary z-10"></div>
      
      {/* Timeline line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-primary/30 -translate-x-1/2 z-0"></div>
      
      {/* Content box */}
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
        
        <p className="text-white/80">{description}</p>
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
      company: "Tech Innovators Inc.",
      position: "Senior Frontend Developer",
      period: "Jan 2022 - Present",
      description: "Led the development of user interfaces for enterprise applications, improving performance by 40%. Mentored junior developers and implemented best practices for code quality and accessibility.",
    },
    {
      company: "Digital Solutions LLC",
      position: "Full Stack Developer",
      period: "Mar 2019 - Dec 2021",
      description: "Developed and maintained web applications for clients across various industries. Implemented responsive designs and optimized database queries, reducing load times by 50%.",
    },
    {
      company: "WebCraft Studios",
      position: "Frontend Developer",
      period: "Jun 2017 - Feb 2019",
      description: "Created interactive UI components and implemented responsive designs. Collaborated with designers to ensure pixel-perfect implementation of mockups.",
    },
    {
      company: "CreativeTech",
      position: "Junior Developer",
      period: "Aug 2015 - May 2017",
      description: "Assisted in the development of websites and web applications. Gained experience in HTML, CSS, JavaScript, and various frontend frameworks.",
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            My Experience
          </h2>
          <p className={`text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            My professional journey, showcasing my growth and expertise over the years.
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
