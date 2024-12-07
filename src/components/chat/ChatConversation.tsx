import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Coach } from '../../types/coach';
import { useAuthStore } from '../../stores/authStore';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { PremiumBanner } from './PremiumBanner';
import EmojiPicker from './EmojiPicker';
import GiftMenu from './GiftMenu';
import { getCoachResponse } from '../../utils/coachResponses';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  senderAvatar: string;
  isPremium: boolean;
}

interface ChatConversationProps {
  coach: Coach;
  onBack: () => void;
}

export function ChatConversation({ coach, onBack }: ChatConversationProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
  const [isCoachTyping, setIsCoachTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addCoachResponse = async (userMessage: string) => {
    setIsCoachTyping(true);
    
    try {
      const response = await getCoachResponse(coach, userMessage);
      
      const coachMessage: Message = {
        id: Date.now().toString(),
        text: response,
        senderId: coach.id,
        timestamp: new Date(),
        senderAvatar: coach.avatar,
        isPremium: true
      };

      setMessages(prev => [...prev, coachMessage]);
    } finally {
      setIsCoachTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const userMessages = messages.filter(m => m.senderId === user?.id);
    if (userMessages.length >= 5) {
      setShowPremiumBanner(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      senderId: user?.id || '',
      timestamp: new Date(),
      senderAvatar: user?.avatar || '',
      isPremium: false
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    await addCoachResponse(newMessage);
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <ChatHeader coach={coach} onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400"
          >
            <p className="mb-2">Aucun message pour le moment</p>
            <p className="text-sm">Commencez la conversation avec {coach.name}</p>
          </motion.div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.senderId === user?.id}
            />
          ))
        )}
        {isCoachTyping && (
          <div className="flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400 ml-14">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <AnimatePresence>
        {showPremiumBanner && (
          <PremiumBanner />
        )}
      </AnimatePresence>

      {!showPremiumBanner && (
        <div className="mt-auto">
          <ChatInput
            newMessage={newMessage}
            onMessageChange={setNewMessage}
            onSendMessage={handleSendMessage}
            onEmojiClick={() => setShowEmojiPicker(!showEmojiPicker)}
            onGiftClick={() => setShowGiftMenu(!showGiftMenu)}
            onKeyPress={handleKeyPress}
          />

          {showEmojiPicker && (
            <div className="absolute bottom-20 left-4">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </div>
          )}

          {showGiftMenu && (
            <GiftMenu 
              onGiftSelect={() => {}} 
              onClose={() => setShowGiftMenu(false)} 
            />
          )}
        </div>
      )}
    </div>
  );
}