
import { Home, User, FolderKanban, Clock, MailPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavItemProps {
  icon: React.ElementType;
  active: boolean;
  href: string;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, active, href, onClick }: NavItemProps) => {
  return (
    <motion.a 
      href={href} 
      className={`nav-icon relative ${active ? 'active text-primary' : 'text-white/70 hover:text-white'}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5" />
      {active && (
        <motion.div 
          className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-primary rounded-full"
          style={{ translateX: "-50%" }}
          layoutId="activeIndicator"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            boxShadow: ["0 0 0px rgba(255, 101, 0, 0.5)", "0 0 8px rgba(255, 101, 0, 0.8)", "0 0 0px rgba(255, 101, 0, 0.5)"]
          }}
          transition={{ 
            boxShadow: {
              repeat: Infinity,
              duration: 2
            }
          }}
        />
      )}
    </motion.a>
  );
};

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "home", icon: Home, href: "#home" },
    { id: "about", icon: User, href: "#about" },
    { id: "projects", icon: FolderKanban, href: "#projects" },
    { id: "experience", icon: Clock, href: "#experience" },
    { id: "contact", icon: MailPlus, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Update the scrolled state based on scroll position
      setScrolled(window.scrollY > 10);

      // Set the active section based on scroll position
      const sections = navItems.map(item => item.id);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // If the top of the element is close to the top of the viewport
          if (rect.top <= 200 && rect.top >= -rect.height + 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  return (
    <motion.nav 
      className={`glass-nav ${scrolled ? 'py-2' : 'py-4'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="text-white font-bold text-xl"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-primary">Port</span>folio
        </motion.div>
        
        <motion.div 
          className="flex gap-5 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <NavItem
                icon={item.icon}
                active={activeSection === item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
