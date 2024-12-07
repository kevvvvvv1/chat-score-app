import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Message {
  id: string;
  chatId: string;
  content: string;
  timestamp: string;
  senderId: string;
  receiverId: string;
}

interface ChatState {
  pinnedChats: string[];
  messages: Message[];
  limitedChats: string[];
  togglePin: (chatId: string) => void;
  isPinned: (chatId: string) => boolean;
  addMessage: (message: Message) => void;
  getLastMessage: (chatId: string) => Message | undefined;
  isLimited: (chatId: string) => boolean;
  setLimited: (chatId: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      pinnedChats: [],
      messages: [],
      limitedChats: [],
      togglePin: (chatId: string) => {
        set((state) => {
          const isPinned = state.pinnedChats.includes(chatId);
          return {
            ...state,
            pinnedChats: isPinned
              ? state.pinnedChats.filter(id => id !== chatId)
              : [...state.pinnedChats, chatId]
          };
        });
      },
      isPinned: (chatId: string) => {
        return get().pinnedChats.includes(chatId);
      },
      addMessage: (message: Message) => {
        set((state) => {
          // Vérifier si le message existe déjà
          const messageExists = state.messages.some(msg => msg.id === message.id);
          if (messageExists) {
            return state;
          }
          
          return {
            ...state,
            messages: [...state.messages, message]
          };
        });
      },
      getLastMessage: (chatId: string) => {
        const messages = get().messages;
        return messages
          .filter(msg => msg.chatId === chatId)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
      },
      isLimited: (chatId: string) => {
        return get().limitedChats.includes(chatId);
      },
      setLimited: (chatId: string) => {
        set((state) => ({
          ...state,
          limitedChats: [...state.limitedChats, chatId]
        }));
      },
      clearMessages: () => {
        set({ messages: [], limitedChats: [] });
      }
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        messages: state.messages,
        pinnedChats: state.pinnedChats,
        limitedChats: state.limitedChats
      }),
      version: 1,
    }
  )
);