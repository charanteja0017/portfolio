
import { useState, useEffect, useRef } from 'react';

interface TypingEffectProps {
  strings: string[];
  typingSpeed?: number;
  backspaceSpeed?: number;
  delayBetweenStrings?: number;
  className?: string;
}

const TypingEffect = ({
  strings,
  typingSpeed = 100,
  backspaceSpeed = 50,
  delayBetweenStrings = 1000,
  className = '',
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentString = strings[currentIndex];

    if (isTyping) {
      // Typing forward
      if (displayedText.length < currentString.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(currentString.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Pause at the end of typing before starting to backspace
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenStrings);
      }
    } else {
      // Backspacing
      if (displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, backspaceSpeed);
      } else {
        // Move to next string
        setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedText, currentIndex, isTyping, strings, typingSpeed, backspaceSpeed, delayBetweenStrings]);

  return <span className={className}>{displayedText}<span className="animate-pulse">|</span></span>;
};

export default TypingEffect;
