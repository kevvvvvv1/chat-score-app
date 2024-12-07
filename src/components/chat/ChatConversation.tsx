import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Coach } from '../../types/coach';
import { useAuthStore } from '../../stores/authStore';
import { useChatStore } from '../../stores/chatStore';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import PremiumBanner from './PremiumBanner';
import EmojiPicker from './EmojiPicker';
import GiftMenu from './GiftMenu';
import { getCoachResponse } from '../../utils/coachResponses';
import { randomResponses } from '../../data/randomResponses';

interface ChatConversationProps {
  coach: Coach;
  onBack?: () => void;
  onSendMessage?: () => void;
}

export default function ChatConversation({ coach, onBack, onSendMessage }: ChatConversationProps) {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
  const [isCoachTyping, setIsCoachTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { messages: allMessages, addMessage, isLimited, setLimited } = useChatStore();

  // Filtrer les messages pour ce coach
  const messages = allMessages.filter(msg => msg.chatId === coach.id);
  
  // Compter les messages de l'utilisateur dans cette conversation
  const userMessageCount = messages.filter(msg => msg.senderId === 'user').length;

  // Vérifier si la conversation est limitée ou si l'utilisateur a atteint la limite
  const shouldShowPremium = !user?.isPremium && (isLimited(coach.id) || userMessageCount >= 4);

  useEffect(() => {
    // Si l'utilisateur atteint la limite et n'est pas premium, marquer la conversation comme limitée
    if (!user?.isPremium && userMessageCount >= 4 && !isLimited(coach.id)) {
      setLimited(coach.id);
      setShowPremiumBanner(true);
    }
  }, [userMessageCount, user?.isPremium, coach.id, isLimited, setLimited]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim() || shouldShowPremium) return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: `${Date.now()}-user`,
      chatId: coach.id,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      senderId: 'user',
      receiverId: coach.id
    };
    
    addMessage(userMessage);
    setNewMessage('');
    setShowEmojiPicker(false);
    scrollToBottom();

    // Simuler la réponse du coach
    setIsCoachTyping(true);
    
    // Délai aléatoire entre 1 et 3 secondes
    const delay = 1000 + Math.random() * 2000;
    
    setTimeout(() => {
      const randomResponse = randomResponses[Math.floor(Math.random() * randomResponses.length)];
      const coachMessage = {
        id: `${Date.now()}-coach`,
        chatId: coach.id,
        content: randomResponse,
        timestamp: new Date().toISOString(),
        senderId: coach.id,
        receiverId: 'user'
      };
      addMessage(coachMessage);
      setIsCoachTyping(false);
      scrollToBottom();
    }, delay);
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleGiftSelect = (gift: { id: string; name: string }) => {
    if (!user?.isPremium) {
      setShowPremiumBanner(true);
      return;
    }
    // Logique d'envoi de cadeau
    handleSendMessage(`🎁 A envoyé un ${gift.name}`);
    setShowGiftMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <ChatHeader coach={coach} onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          if (!message || !message.content || !message.timestamp || !message.senderId) return null;
          
          const timestamp = message.timestamp ? new Date(message.timestamp) : new Date();
          if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) return null;
          
          return (
            <ChatMessage
              key={message.id}
              content={typeof message.content === 'string' ? message.content : ''}
              timestamp={timestamp}
              isUser={message.senderId === 'user'}
              avatar={message.senderId === 'user' ? (user?.avatar || '/default-avatar.png') : (coach.avatar || '/default-avatar.png')}
              isPremium={message.senderId === 'user' ? user?.isPremium : true}
            />
          );
        })}
        {isCoachTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <img
              src={coach.avatar}
              alt={coach.name}
              className="w-8 h-8 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2"
            >
              typing...
            </motion.div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <AnimatePresence>
        {shouldShowPremium && (
          <PremiumBanner 
            onClose={() => {
              setShowPremiumBanner(false);
              onBack?.();  
            }}
            onUpgrade={() => {
              window.location.href = '/premium';
            }}
          />
        )}
      </AnimatePresence>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <ChatInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          onEmojiClick={() => setShowEmojiPicker(!showEmojiPicker)}
          onGiftClick={() => setShowGiftMenu(!showGiftMenu)}
          showEmojiPicker={showEmojiPicker}
          showGiftMenu={showGiftMenu}
          disabled={shouldShowPremium}
        />
        
        <AnimatePresence>
          {showEmojiPicker && !shouldShowPremium && (
            <EmojiPicker
              onSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
          {showGiftMenu && !shouldShowPremium && (
            <GiftMenu
              onGiftSelect={handleGiftSelect}
              onClose={() => setShowGiftMenu(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}