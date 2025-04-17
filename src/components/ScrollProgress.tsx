
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar only after scrolling down a bit
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      className={`fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ scaleX: scrollYProgress }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  );
};

export default ScrollProgress;
