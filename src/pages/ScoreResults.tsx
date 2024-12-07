import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCamera,
  faUser,
  faBrain,
  faHeart,
  faFire,
  faShieldAlt,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';
import { useScoreStore } from '../stores/scoreStore';
import { usePersonalityStore } from '../stores/personalityStore';

const SkillBar = ({ name, value, icon, color }: { name: string; value: number; icon: any; color: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    className="mb-6"
  >
    <div className="flex items-center mb-2">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${color}`}>
        <FontAwesomeIcon icon={icon} className="text-white text-xl" />
      </div>
      <span className="text-lg font-bold dark:text-white">{name}</span>
      <span className="ml-auto text-2xl font-bold dark:text-white">{value}%</span>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color}`}
      />
    </div>
  </motion.div>
);

export default function ScoreResults() {
  const navigate = useNavigate();
  const { photoScore, personalityScore, getOverallScore } = useScoreStore();
  const { traits, resetTest } = usePersonalityStore();
  const overallScore = getOverallScore();

  const handleRestartTest = () => {
    resetTest();
    navigate('/personality');
  };

  const skills = [
    { name: "Photo", value: photoScore, icon: faCamera, color: "bg-purple-500" },
    { name: "Personnalité", value: personalityScore, icon: faUser, color: "bg-blue-500" },
    { name: "Intelligence", value: traits.intelligence, icon: faBrain, color: "bg-green-500" },
    { name: "Charisme", value: traits.charisme, icon: faHeart, color: "bg-pink-500" },
    { name: "Énergie", value: traits.energie, icon: faFire, color: "bg-orange-500" },
    { name: "Résilience", value: traits.resilience, icon: faShieldAlt, color: "bg-indigo-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      {/* Score Global */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <FontAwesomeIcon icon={faStar} className="text-yellow-300 text-4xl mb-2" />
          <h1 className="text-2xl font-bold mb-2">Score Global</h1>
          <div className="text-6xl font-bold mb-2">{overallScore}%</div>
          <div className="text-sm opacity-75">Niveau Expert</div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-50 transform rotate-45"
          />
        </div>
      </motion.div>

      {/* Compétences Détaillées */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white">Compétences</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestartTest}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FontAwesomeIcon icon={faRedo} className="text-sm" />
            <span>Refaire le test</span>
          </motion.button>
        </div>
        
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SkillBar
              name={skill.name}
              value={skill.value}
              icon={skill.icon}
              color={skill.color}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
