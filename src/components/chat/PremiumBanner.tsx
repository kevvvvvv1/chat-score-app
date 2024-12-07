import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faTimes } from '@fortawesome/free-solid-svg-icons';

interface PremiumBannerProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const PremiumBanner = ({ onClose, onUpgrade }: PremiumBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCrown} className="text-3xl text-yellow-500" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Passez à la version Premium
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Profitez d'une expérience de conversation illimitée avec nos coachs et débloquez toutes les fonctionnalités premium.
          </p>

          <div className="space-y-4">
            <button 
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl"
            >
              Devenir Premium
            </button>
            
            <button
              onClick={onClose}
              className="w-full px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PremiumBanner;