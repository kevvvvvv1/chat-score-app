import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePersonalityStore } from '../stores/personalityStore';

export default function PersonalityTest() {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    questions,
    answers,
    setAnswer,
    nextQuestion,
    previousQuestion,
    calculateTraits
  } = usePersonalityStore();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    setAnswer(currentQuestion.id, optionIndex);
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      calculateTraits();
      navigate('/personality-results');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-lg mx-auto"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Question {currentQuestionIndex + 1}/{questions.length}</span>
            <span className="text-gray-600 dark:text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-blue-500 rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-6 dark:text-white">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  answers[currentQuestion.id] === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                } shadow-md`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg ${
              currentQuestionIndex === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-500 hover:bg-gray-600'
            } text-white transition-colors`}
          >
            Précédent
          </button>
          
          {currentQuestionIndex === questions.length - 1 && (
            <button
              onClick={() => {
                calculateTraits();
                navigate('/personality-results');
              }}
              className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              Terminer
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}