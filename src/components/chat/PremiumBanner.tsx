import { motion } from 'framer-motion';

export function PremiumBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-gray-900/95 p-6 text-center"
    >
      <h3 className="text-2xl font-bold text-white mb-4">
        Passez en Premium pour continuer la conversation
      </h3>
      <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
        Devenir Premium
      </button>
    </motion.div>
  );
}