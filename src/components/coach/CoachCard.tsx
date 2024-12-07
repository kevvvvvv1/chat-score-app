import { motion } from 'framer-motion';
import { Coach } from '../../types/coach';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface CoachCardProps {
  coach: Coach;
  onProfileClick: (coach: Coach) => void;
}

export default function CoachCard({ coach, onProfileClick }: CoachCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onProfileClick(coach)}
      className="relative rounded-xl overflow-hidden cursor-pointer"
    >
      <img
        src={coach.avatar}
        alt={coach.name}
        className="w-full h-[400px] object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-2xl font-bold">{coach.name}</h3>
          {coach.isVerified && (
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-200 mb-4">{coach.bio}</p>
        
        {/* Interests/Tags */}
        <div className="flex flex-wrap gap-2">
          {coach.interests.slice(0, 4).map((interest, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-black/30 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}