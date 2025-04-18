import { useEffect, useRef, useState } from "react";
import { Send, Mail, Phone, Github } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface ContactInfoItemProps {
  icon: React.ElementType;
  title: string;
  content: string;
  link?: string;
  delay: number;
  inView: boolean;
}

const ContactInfoItem = ({ icon: Icon, title, content, link, delay, inView }: ContactInfoItemProps) => {
  return (
    <div 
      className={`flex gap-4 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        {link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white/70 hover:text-primary transition-colors"
          >
            {content}
          </a>
        ) : (
          <p className="text-white/70">{content}</p>
        )}
      </div>
    </div>
  );
};

const Contact = () => {
  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://viqustwtfjtjpzdoihxw.supabase.co/functions/v1/public-update-contact-messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast.success("Message sent!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+91 9515288857",
      delay: 100,
    },
    {
      icon: Mail,
      title: "Email",
      content: "charanteja0017@gmail.com",
      delay: 200,
    },
    {
      icon: Github,
      title: "GitHub",
      content: "github.com/charanteja0017",
      link: "https://github.com/charanteja0017",
      delay: 300,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`section-title transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            Get In Touch
          </h2>
          <p className={`text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            Interested in collaboration or have a project in mind? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div 
              className={`glass-card transition-all duration-700 ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <ContactInfoItem
                    key={index}
                    icon={info.icon}
                    title={info.title}
                    content={info.content}
                    link={info.link}
                    delay={info.delay}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          </div>

          <div 
            className={`lg:col-span-3 transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="glass-card">
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Hello Charan, I'd like to discuss..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary flex items-center gap-2"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
