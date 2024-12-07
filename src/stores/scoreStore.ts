import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ScoreState {
  photoScore: number | null;
  personalityScore: number | null;
  setPhotoScore: (score: number) => void;
  setPersonalityScore: (score: number) => void;
  getOverallScore: () => number | null;
}

export const useScoreStore = create<ScoreState>()(
  persist(
    (set, get) => ({
      photoScore: null,
      personalityScore: null,
      setPhotoScore: (score: number) => set({ photoScore: score }),
      setPersonalityScore: (score: number) => set({ personalityScore: score }),
      getOverallScore: () => {
        const scores = [get().photoScore, get().personalityScore].filter(
          (score): score is number => score !== null
        );
        if (scores.length === 0) return null;
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      },
    }),
    {
      name: 'score-storage',
    }
  )
);