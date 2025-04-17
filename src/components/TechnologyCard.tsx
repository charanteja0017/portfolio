
import { FC } from 'react';
import { motion } from 'framer-motion';

interface TechnologyCardProps {
  name: string;
  imageUrl: string;
  category: string;
}

const TechnologyCard: FC<TechnologyCardProps> = ({ name, imageUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <div className="glass-card overflow-hidden flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,101,0,0.3)] group-hover:border-primary/30">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-8 h-8 mb-2 transition-transform duration-300 group-hover:scale-110"
        />
        <h4 className="text-sm font-medium text-white/90">{name}</h4>
      </div>
    </motion.div>
  );
};

export default TechnologyCard;
