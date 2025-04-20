
import { Github, Linkedin, Twitter } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
const Footer = () => {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white mb-6 md:mb-0">
            <div className="font-bold text-xl mb-1">
              <span className="text-primary">Charan</span>Teja
            </div>
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors"
              aria-label="Github"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors"
              aria-label="Leetcode"
            >
              <SiLeetcode className="w-5 h-5" />

             
            </a>
            <a 
              href="https://www.linkedin.com/in/charan-teja-pampana-968b06213/" 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
