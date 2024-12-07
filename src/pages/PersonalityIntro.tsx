import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faClock, faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function PersonalityIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faBrain} className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Test de Personnalité</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Découvrez votre profil unique et améliorez votre score
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faClock} className="text-blue-500 mr-3" />
              <h3 className="font-semibold dark:text-white">Durée</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Environ 5 minutes pour compléter le test</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faChartLine} className="text-blue-500 mr-3" />
              <h3 className="font-semibold dark:text-white">Résultats</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Obtenez une analyse détaillée de vos traits de personnalité et des recommandations personnalisées
            </p>
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/personality-test')}
          className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors"
        >
          Commencer le Test
        </motion.button>

        <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Vos réponses resteront confidentielles et seront utilisées uniquement pour améliorer votre expérience
        </p>
      </motion.div>
    </div>
  );
}
