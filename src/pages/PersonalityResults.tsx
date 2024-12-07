import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { usePersonalityStore } from '../stores/personalityStore';

export default function PersonalityResults() {
  const navigate = useNavigate();
  const { traits, getDetailedAnalysis } = usePersonalityStore();
  const analysis = getDetailedAnalysis();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header avec animation */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faStar} className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-3 dark:text-white">Votre Analyse Personnalisée</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Découvrez vos forces et axes d'amélioration pour des relations plus épanouies
          </p>
        </div>

        {/* Description de la personnalité */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Votre Profil Relationnel</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            {analysis.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Bouton pour voir les scores détaillés */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/score-results')}
          className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-3"
        >
          <FontAwesomeIcon icon={faChartLine} />
          <span>Voir mes scores détaillés</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
