
import { FC } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface TechnologyCardProps {
  name: string;
  icon: LucideIcon;
  category: string;
}

const TechnologyCard: FC<TechnologyCardProps> = ({ name, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <div className="glass-card overflow-hidden flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,101,0,0.3)] group-hover:border-primary/30">
        <Icon className="w-12 h-12 text-primary mb-3 transition-transform duration-300 group-hover:scale-110" />
        <h4 className="text-lg font-medium text-white/90">{name}</h4>
      </div>
    </motion.div>
  );
};

export default TechnologyCard;
