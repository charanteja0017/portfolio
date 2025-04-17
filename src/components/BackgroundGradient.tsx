
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BackgroundGradient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary color gradient that follows mouse */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-10 bg-primary blur-[120px]"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 50,
          mass: 0.5,
        }}
      />
      
      {/* Secondary gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 bg-secondary blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10 bg-dark blur-[100px]"></div>
    </div>
  );
};

export default BackgroundGradient;
