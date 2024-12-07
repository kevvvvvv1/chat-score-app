import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePersonalityStore } from '../../stores/personalityStore';

export default function ScoreRedirect() {
  const { traits } = usePersonalityStore();
  
  // Vérifie si l'utilisateur a des traits calculés (a fait le test)
  const hasCompletedTest = Object.values(traits).some(value => value > 0);

  // Redirige vers la page de personnalité si le test n'a pas été fait
  if (!hasCompletedTest) {
    return <Navigate to="/personality" replace />;
  }

  // Si le test a été fait, continue vers la page de score
  return <Navigate to="/score-results" replace />;
}
