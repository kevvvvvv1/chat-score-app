import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faCircleCheck,
  faStar,
  faLanguage,
  faLocationDot,
  faBriefcase
} from '@fortawesome/free-solid-svg-icons';
import { Coach } from '../../types/coach';

interface ProfileModalProps {
  coach: Coach;
  onClose: () => void;
}

const ProfileModal = ({ coach, onClose }: ProfileModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
        >
          {/* Header avec bouton de fermeture */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>

          {/* Avatar qui chevauche le header */}
          <div className="relative px-6">
            <div className="absolute -top-16 flex items-end">
              <div className="relative">
                <img
                  src={coach.avatar || '/default-avatar.png'}
                  alt={coach.name}
                  className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-800 object-cover"
                />
                {coach.isPremium && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white p-1 rounded-full">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Informations du profil */}
          <div className="px-6 pt-20 pb-6 space-y-6">
            {/* En-tête du profil */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold dark:text-white">
                  {coach.name}
                </h2>
                <span className={`text-sm px-2 py-1 rounded ${
                  coach.isPremium 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  {coach.isPremium ? 'Premium' : 'Free'}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    coach.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                  {coach.isOnline ? 'En ligne' : 'Hors ligne'}
                </div>
                {coach.rating && (
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                    <span>{coach.rating.toFixed(1)}</span>
                    {coach.reviewCount && (
                      <span className="text-gray-400">({coach.reviewCount})</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Informations détaillées */}
            <div className="space-y-4">
              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {coach.description || coach.bio || "Aucune description disponible"}
                </p>
              </div>

              {/* Spécialités */}
              {coach.specialties && coach.specialties.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Spécialités
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {coach.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Informations supplémentaires */}
              <div className="grid grid-cols-2 gap-4">
                {/* Langues */}
                {coach.languages && (
                  <div className="flex items-start gap-2">
                    <FontAwesomeIcon 
                      icon={faLanguage} 
                      className="text-gray-400 mt-1"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Langues
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {coach.languages.join(', ')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Localisation */}
                {coach.location && (
                  <div className="flex items-start gap-2">
                    <FontAwesomeIcon 
                      icon={faLocationDot} 
                      className="text-gray-400 mt-1"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Localisation
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {coach.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Expérience */}
                {coach.experience && (
                  <div className="flex items-start gap-2">
                    <FontAwesomeIcon 
                      icon={faBriefcase} 
                      className="text-gray-400 mt-1"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Expérience
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {coach.experience}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;
