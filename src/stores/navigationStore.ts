import { create } from 'zustand';

interface NavigationState {
  isInChatConversation: boolean;
  setInChatConversation: (value: boolean) => void;
}

export const useNavigationStore = create<NavigationState>()((set) => ({
  isInChatConversation: false,
  setInChatConversation: (value: boolean) => set({ isInChatConversation: value }),
}));
