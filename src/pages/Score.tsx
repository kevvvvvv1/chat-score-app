import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faCamera, 
  faUserCircle, 
  faPencilAlt, 
  faLock 
} from '@fortawesome/free-solid-svg-icons';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import { useScoreStore } from '../stores/scoreStore';

export default function Score() {
  const { photoScore, personalityScore, getOverallScore } = useScoreStore();
  const navigate = useNavigate();

  const handleTestClick = (type: string) => {
    switch (type) {
      case 'photo':
        navigate('/photo-test');
        break;
      case 'personality':
        navigate('/personality-test');
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-y-auto h-full">
      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="relative overflow-hidden">
          <div className="relative p-6 text-center">
            <div className="mb-4">
              <FontAwesomeIcon 
                icon={faChartLine} 
                className="text-4xl text-primary mb-2" 
              />
              <h2 className="text-2xl font-bold dark:text-white">Score Global</h2>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-6xl font-bold text-primary">
                {getOverallScore() ?? '?'}
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-500 dark:text-gray-400">sur</div>
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">100</div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {getOverallScore() === null
                ? 'Complétez les tests ci-dessous pour obtenir votre score'
                : 'Excellent ! Continuez à améliorer votre profil'}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Test Cards */}
      <div className="space-y-6">
        {/* Photo Test Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleTestClick('photo')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faCamera} className="text-blue-500 text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 dark:text-white">Photo Test</h3>
                <p className="text-gray-600 dark:text-gray-400">Analysez vos photos pour optimiser votre profil</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                <span className="text-sm font-medium dark:text-white">
                  {photoScore ? `${photoScore}%` : 'Non testé'}
                </span>
              </div>
              <ProgressBar 
                progress={photoScore ?? 0} 
                color="bg-blue-500"
              />
            </div>
          </Card>
        </motion.div>

        {/* Personality Test Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleTestClick('personality')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUserCircle} className="text-green-500 text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 dark:text-white">Test de personnalité</h3>
                <p className="text-gray-600 dark:text-gray-400">Découvrez votre type de personnalité</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                <span className="text-sm font-medium dark:text-white">
                  {personalityScore ? `${personalityScore}%` : 'Non testé'}
                </span>
              </div>
              <ProgressBar 
                progress={personalityScore ?? 0} 
                color="bg-green-500"
              />
            </div>
          </Card>
        </motion.div>

        {/* Description Optimizer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPencilAlt} className="text-purple-500 text-xl" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold mb-1 dark:text-white">Description Optimizer</h3>
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">Optimisez votre description pour plus d'impact</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                <span className="text-sm font-medium dark:text-white">Premium uniquement</span>
              </div>
              <ProgressBar 
                progress={0} 
                color="bg-purple-500"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900/10 dark:bg-gray-900/40 flex items-center justify-center">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Premium</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}