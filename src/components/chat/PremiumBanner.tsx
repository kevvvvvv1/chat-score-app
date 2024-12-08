import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

interface PremiumBannerProps {
  onUpgrade?: () => void;
  onBack: () => void;
}

const PremiumBanner = ({ onUpgrade, onBack }: PremiumBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 relative"
        onClick={e => e.stopPropagation()}
      >
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
              onClick={onBack}
              className="w-full px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              Retour aux chats
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PremiumBanner;