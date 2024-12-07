import { motion } from 'framer-motion';
import { Coach } from '../../types/coach';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';

interface CoachProfileProps {
  coach: Coach;
  onClose: () => void;
}

export default function CoachProfile({ coach, onClose }: CoachProfileProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="relative h-[70vh]">
          <img
            src={coach.avatar}
            alt={coach.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="flex items-center gap-2">
              {coach.isVerified && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
                </div>
              )}
            </div>
          </div>
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h1 className="text-3xl font-bold mb-2">
              {coach.name}
            </h1>
            <p className="text-lg mb-4">{coach.bio}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {coach.interests.map((interest, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-black/30 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-1 bg-black p-6 flex items-center justify-center gap-4">
          <button className="w-14 h-14 bg-black rounded-full border-2 border-gray-700 flex items-center justify-center">
            <FontAwesomeIcon icon={faArrowLeft} className="text-xl text-white" />
          </button>
          <button className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faFire} className="text-2xl text-white" />
          </button>
          <button className="w-14 h-14 bg-black rounded-full border-2 border-gray-700 flex items-center justify-center">
            <FontAwesomeIcon icon={faHeart} className="text-xl text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}