import { motion } from 'framer-motion';
import { Coach } from '../../types/coach';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface CoachCardListProps {
  coach: Coach;
  onProfileClick: (coach: Coach) => void;
}

export default function CoachCardList({ coach, onProfileClick }: CoachCardListProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onProfileClick(coach)}
      className="relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer flex items-center p-4"
    >
      <img
        src={coach.avatar}
        alt={coach.name}
        className="w-24 h-24 rounded-full object-cover mr-6"
      />
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-white">{coach.name}</h3>
          {coach.isVerified && (
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
            </div>
          )}
          <span className={`ml-2 w-2 h-2 rounded-full ${
            coach.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        
        <p className="text-sm text-gray-300 mb-3">{coach.bio}</p>
        
        <div className="flex flex-wrap gap-2">
          {coach.interests.slice(0, 3).map((interest, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}