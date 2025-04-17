
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") !== null || 
        target.closest("a") !== null ||
        getComputedStyle(target).cursor === "pointer";
      
      setIsPointer(isClickable);
    };
    
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  
  return (
    <>
      {/* Outer cursor */}
      <motion.div
        className="fixed w-12 h-12 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 20px rgba(255, 101, 0, 0.6), 0 0 40px rgba(255, 101, 0, 0.3)"
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          opacity: isActive ? 0.7 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      
      {/* Inner cursor */}
      <motion.div
        className="fixed w-3 h-3 rounded-full bg-primary pointer-events-none z-50 mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 10px rgba(255, 101, 0, 0.8)"
        }}
        animate={{
          scale: isActive ? 3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          mass: 0.1,
        }}
      />
    </>
  );
};

export default CustomCursor;
