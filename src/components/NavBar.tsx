import { Home, User, FolderKanban, Clock, MailPlus, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItemProps {
  icon: React.ElementType;
  active: boolean;
  href: string;
  onClick: () => void;
  label?: string;
  isMobile?: boolean;
}

const NavItem = ({ icon: Icon, active, href, onClick, label, isMobile }: NavItemProps) => {
  if (isMobile) {
    return (
      <motion.a 
        href={href} 
        className={`flex items-center gap-3 p-4 mb-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 ${
          active ? 'text-primary border-primary/50' : 'text-white/80 hover:text-white'
        }`}
        onClick={(e) => {
          e.preventDefault();
          onClick();
          const element = document.getElementById(href.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
        {active && (
          <motion.div 
            className="ml-auto w-2 h-2 bg-primary rounded-full"
            layoutId="mobileActiveIndicator"
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.a>
    );
  }
  
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { id: "home", icon: Home, href: "#home", label: "Home" },
    { id: "about", icon: User, href: "#about", label: "About" },
    { id: "projects", icon: FolderKanban, href: "#projects", label: "Projects" },
    { id: "experience", icon: Clock, href: "#experience", label: "Experience" },
    { id: "contact", icon: MailPlus, href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleNavItemClick = (id: string) => {
    setActiveSection(id);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav 
        className={`glass-nav fixed top-0 left-0 right-0 z-50 ${scrolled ? 'py-2' : 'py-4'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <motion.div 
            className="text-white font-bold text-xl"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">Charan</span>Teja
          </motion.div>
          
          {isMobile ? (
            <motion.button
              className="text-white p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          ) : (
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
                    onClick={() => handleNavItemClick(item.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Side drawer - Changed to right side */}
            <motion.div
              className="fixed top-0 right-0 h-full w-64 z-50 bg-gray-900/80 backdrop-blur-xl p-5 shadow-lg border-l border-white/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <motion.button
                  className="text-white p-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
                <motion.div className="text-white font-bold text-xl">
                  <span className="text-primary">Charan</span>Teja
                </motion.div>
              </div>
              
              <div className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <NavItem
                      icon={item.icon}
                      active={activeSection === item.id}
                      href={item.href}
                      onClick={() => handleNavItemClick(item.id)}
                      label={item.label}
                      isMobile={true}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;