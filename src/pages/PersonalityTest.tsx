import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGem, 
  faArrowRight, 
  faChartLine,
  faHeart,
  faBrain,
  faLightbulb,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import Card from '../components/ui/Card';
import { questions } from '../data/personalityQuestions';
import { useScoreStore } from '../stores/scoreStore';

export default function PersonalityTest() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const { setPersonalityScore, personalityScore } = useScoreStore();

  const handleAnswer = (trait: string) => {
    const newAnswers = { ...answers, [currentQuestion]: trait };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score only once at the end
      const score = calculateResults(newAnswers);
      setPersonalityScore(score);
      setShowResults(true);
    }
  };

  const calculateResults = (finalAnswers: Record<number, string>) => {
    // Here we could implement real score calculation based on answers
    // For now, we'll generate a score between 80-100
    return Math.floor(Math.random() * 20) + 80;
  };

  if (!started) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card className="max-w-2xl mx-auto p-8">
          <div className="text-center mb-8">
            <FontAwesomeIcon 
              icon={faBrain} 
              className="text-5xl text-primary mb-4" 
            />
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Test de Personnalité
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Ce test va nous permettre d'évaluer vos qualités et d'estimer votre attractivité. 
              Il vous aidera également à identifier vos points forts et les aspects à améliorer.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition-colors"
            >
              Commencer le test
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card className="max-w-2xl mx-auto p-8">
          <div className="text-center mb-8">
            <FontAwesomeIcon 
              icon={faGem} 
              className="text-5xl text-primary mb-4" 
            />
            <h2 className="text-2xl font-bold mb-2 dark:text-white">
              Votre Analyse de Personnalité
            </h2>
            <div className="text-6xl font-bold text-primary mb-4">
              {personalityScore}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Excellent ! Voici l'analyse de votre personnalité
            </p>

            <div className="space-y-6 mb-8">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Vos points forts
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Grande capacité d'adaptation</li>
                  <li>Excellente communication</li>
                  <li>Fort potentiel de leadership</li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Points à améliorer
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Gestion du stress</li>
                  <li>Prise de décision</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => navigate('/score')}
              className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition-colors"
            >
              Retour aux scores
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="max-w-2xl mx-auto p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold dark:text-white">
              Question {currentQuestion + 1} sur {questions.length}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6 dark:text-white">
          {questions[currentQuestion].text}
        </h2>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.trait)}
              className="w-full p-4 text-left rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}