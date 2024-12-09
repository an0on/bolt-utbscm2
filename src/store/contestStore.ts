import { create } from 'zustand';
import { Category, Participant, Score, Heat } from '../types';

interface ContestStore {
  participants: Participant[];
  scores: Score[];
  heats: Heat[];
  categories: Category[];
  heatConfigs: { [key: string]: HeatConfig };
  addParticipant: (participant: Omit<Participant, 'id' | 'startNumber' | 'paidCategories'>) => void;
  updateParticipant: (id: string, updates: Partial<Participant>) => void;
  addScore: (score: Omit<Score, 'finalScore'>) => void;
  updateHeats: (category: Category) => void;
  toggleCategoryPayment: (participantId: string, category: Category) => void;
  addCategory: (category: Category) => void;
  removeCategory: (category: Category) => void;
  setHeatConfig: (category: Category, config: Partial<HeatConfig>) => void;
}

interface HeatConfig {
  firstRoundSize: number;
  secondRoundQualifiers: number;
  secondRoundSize: number;
  finalists: number;
}

export const useContestStore = create<ContestStore>((set, get) => ({
  participants: [],
  scores: [],
  heats: [],
  categories: [],
  heatConfigs: {},

  addParticipant: (participant) => {
    set((state) => {
      const newParticipant = {
        ...participant,
        id: crypto.randomUUID(),
        startNumber: state.participants.length + 1,
        paidCategories: []
      };

      return {
        participants: [...state.participants, newParticipant]
      };
    });
  },

  updateParticipant: (id, updates) => {
    set((state) => {
      const updatedParticipants = state.participants.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      return { participants: updatedParticipants };
    });
  },

  toggleCategoryPayment: (participantId, category) => {
    set((state) => {
      const updatedParticipants = state.participants.map(p => {
        if (p.id === participantId) {
          const paidCategories = p.paidCategories.includes(category)
            ? p.paidCategories.filter(c => c !== category)
            : [...p.paidCategories, category];

          return { ...p, paidCategories };
        }
        return p;
      });
      // Update heats after payment status change
      get().updateHeats(category);
      return { participants: updatedParticipants };
    });
  },

  addScore: (score) => {
    const scores = score.judgeScores.map(s => s.score);
    const sortedScores = [...scores].sort((a, b) => a - b);
    const validScores = sortedScores.slice(1, -1);
    const finalScore = validScores.reduce((a, b) => a + b, 0) / validScores.length;

    set((state) => ({
      scores: [...state.scores, { ...score, finalScore }]
    }));
  },

  updateHeats: (category) => {
    set((state) => {
      const config = state.heatConfigs[category] || { firstRoundSize: 5, secondRoundQualifiers: 3, secondRoundSize: 2, finalists: 1 };
      const { firstRoundSize, secondRoundQualifiers, secondRoundSize, finalists } = config;
      // Only include participants who have paid for this specific category
      const categoryParticipants = state.participants
        .filter(p => state.categories.includes(category) && p.categories.includes(category) && p.paidCategories.includes(category))
        .map(p => p.id);

      // Shuffle participants randomly
      const shuffledParticipants = shuffleArray(categoryParticipants);

      // Remove existing heats for this category
      const otherHeats = state.heats.filter(h => h.category !== category);

      // Create new heats with firstRoundSize participants each
      const firstRoundHeats: Heat[] = [];
      for (let i = 0; i < shuffledParticipants.length; i += firstRoundSize) {
        firstRoundHeats.push({
          id: crypto.randomUUID(),
          category,
          participants: shuffledParticipants.slice(i, i + firstRoundSize),
          round: 1,
          status: 'PENDING'
        });
      }

      // Create second round heats
      const firstRoundWinners = firstRoundHeats.flatMap(heat => heat.participants.slice(0, secondRoundQualifiers));
      const secondRoundHeats: Heat[] = [];
      for (let i = 0; i < firstRoundWinners.length; i += secondRoundSize) {
        secondRoundHeats.push({
          id: crypto.randomUUID(),
          category,
          participants: firstRoundWinners.slice(i, i + secondRoundSize),
          round: 2,
          status: 'PENDING'
        });
      }

      // Add finalists
      const secondRoundWinners = secondRoundHeats.flatMap(heat => heat.participants.slice(0, finalists));
      const finalHeats: Heat[] = [{
        id: crypto.randomUUID(),
        category,
        participants: secondRoundWinners,
        round: 3,
        status: 'PENDING'
      }];

      return { heats: [...otherHeats, ...firstRoundHeats, ...secondRoundHeats, ...finalHeats] };
    });
  },

  addCategory: (category) => {
    set((state) => ({ categories: [...state.categories, category], heatConfigs: { ...state.heatConfigs, [category]: { firstRoundSize: 5, secondRoundQualifiers: 3, secondRoundSize: 2, finalists: 1 } } }));
  },

  removeCategory: (category) => {
    set((state) => ({ categories: state.categories.filter(c => c !== category), heatConfigs: Object.fromEntries(Object.entries(state.heatConfigs).filter(([c]) => c !== category)) }));
  },

  setHeatConfig: (category, config) => set((state) => ({ heatConfigs: { ...state.heatConfigs, [category]: { ...state.heatConfigs[category], ...config } } }))
}));

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
