import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatState {
  pinnedChats: string[];
  togglePin: (chatId: string) => void;
  isPinned: (chatId: string) => boolean;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      pinnedChats: [],
      togglePin: (chatId: string) => {
        set((state) => {
          const isPinned = state.pinnedChats.includes(chatId);
          return {
            pinnedChats: isPinned
              ? state.pinnedChats.filter(id => id !== chatId)
              : [...state.pinnedChats, chatId]
          };
        });
      },
      isPinned: (chatId: string) => {
        return get().pinnedChats.includes(chatId);
      }
    }),
    {
      name: 'chat-storage'
    }
  )
);