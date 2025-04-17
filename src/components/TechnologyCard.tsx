
import { FC } from 'react';
import { motion } from 'framer-motion';

interface TechnologyCardProps {
  name: string;
  imageUrl: string;
}

const TechnologyCard: FC<TechnologyCardProps> = ({ name, imageUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="relative group w-full"
    >
      <div className="glass-card h-12 w-full flex items-center gap-3 p-2">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
        />
        <h4 className="text-sm font-medium text-white/90 truncate">{name}</h4>
      </div>
    </motion.div>
  );
};

export default TechnologyCard;
