import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Coach } from '../../types/coach';
import { useAuthStore } from '../../stores/authStore';
import { useChatStore } from '../../stores/chatStore';
import { useNavigate } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import PremiumBanner from './PremiumBanner';
import GiftMenu, { Gift } from './GiftMenu';
import '../../styles/chat/chat.css';

const getRandomResponse = (coach: Coach) => {
  const responses = [
    "Je comprends ce que vous ressentez.",
    "C'est une situation intéressante.",
    "Pouvez-vous m'en dire plus ?",
    "Je suis là pour vous écouter.",
    "Comment vous sentez-vous par rapport à cela ?",
    "Prenons le temps d'explorer cela ensemble.",
  ];
  
  if (coach.type === 'Psychologue') {
    responses.push(
      "Comment cela affecte-t-il votre quotidien ?",
      "Quels sentiments cela évoque-t-il en vous ?",
      "Avez-vous déjà vécu une situation similaire ?",
    );
  } else if (coach.type === 'Coach de vie') {
    responses.push(
      "Quels sont vos objectifs dans cette situation ?",
      "Que souhaitez-vous accomplir ?",
      "Comment puis-je vous aider à avancer ?",
    );
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
};

interface ChatConversationProps {
  coach: Coach;
  onBack?: () => void;
  onSendMessage?: () => void;
}

export default function ChatConversation({ coach, onBack, onSendMessage }: ChatConversationProps) {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [isCoachTyping, setIsCoachTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [messageAreaHeight, setMessageAreaHeight] = useState('calc(100vh - 180px)');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuthStore();
  const { messages: allMessages, addMessage, isLimited, setLimited } = useChatStore();

  // Filtrer les messages pour ce coach
  const messages = allMessages.filter(msg => msg.chatId === coach.id);
  
  // Compter les messages de l'utilisateur dans cette conversation
  const userMessageCount = messages.filter(msg => msg.senderId === 'user').length;
  
  // Vérifier si l'utilisateur est premium
  const isPremium = user?.isPremium ?? false;

  // Vérifier si la conversation doit être limitée
  const shouldShowPremium = !isPremium && (isLimited(coach.id) || userMessageCount >= 5);

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const inputHeight = inputRef.current?.offsetHeight || 0;
      const totalHeight = headerHeight + inputHeight;
      setMessageAreaHeight(`calc(100vh - ${totalHeight + 20}px)`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const container = messagesContainerRef.current;
      if (container) {
        const { scrollHeight, scrollTop, clientHeight } = container;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        if (isNearBottom) {
          scrollToBottom();
        }
      }
    }
  }, [messages.length]);

  useEffect(() => {
    // Vérifier si on doit limiter la conversation
    if (!isPremium && userMessageCount >= 5 && !isLimited(coach.id)) {
      setLimited(coach.id);
    }
  }, [userMessageCount, isPremium, coach.id, isLimited, setLimited]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;
    if (shouldShowPremium) return;

    let messageContent = newMessage;
    let imageData = null;

    if (selectedFile && previewUrl) {
      imageData = {
        data: previewUrl,
        type: selectedFile.type
      };
    }

    const message = {
      id: Date.now().toString(),
      chatId: coach.id,
      content: messageContent,
      timestamp: new Date().toISOString(),
      senderId: 'user',
      receiverId: coach.id,
      ...(imageData && { image: imageData })
    };

    addMessage(message);
    setNewMessage('');
    clearFileSelection();
    scrollToBottom();
    
    // Simuler la réponse du coach
    setIsCoachTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const coachMessage = {
      id: (Date.now() + 1).toString(),
      chatId: coach.id,
      content: getRandomResponse(coach),
      timestamp: new Date().toISOString(),
      senderId: coach.id,
      receiverId: 'user'
    };

    addMessage(coachMessage);
    setIsCoachTyping(false);
    scrollToBottom();
    
    if (onSendMessage) {
      onSendMessage();
    }
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Maximum 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleGiftSelect = (gift: Gift) => {
    const giftMessage = `🎁 A envoyé un cadeau : ${gift.name} (${gift.price} crédits)`;
    handleSendMessage(giftMessage);
    setShowGiftMenu(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.scrollTop === 0) {
      // TODO: Implémenter la vraie logique de chargement des messages précédents
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div ref={headerRef}>
        <ChatHeader coach={coach} onBack={onBack} />
      </div>
      
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto relative scroll-smooth"
        style={{ height: messageAreaHeight }}
        onScroll={handleScroll}
      >
        <div className="py-6 min-h-full flex flex-col justify-end space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <span className="text-4xl mb-2">👋</span>
              <p className="text-gray-500 dark:text-gray-400 text-center px-4">
                Commencez une nouvelle conversation
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isUser={message.senderId === 'user'}
                avatar={message.senderId === 'user' ? (user?.avatar || '/default-avatar.png') : (coach.avatar || '/default-avatar.png')}
                isPremium={message.senderId === 'user' ? isPremium : true}
              />
            ))
          )}
          {isCoachTyping && (
            <div className="flex items-center gap-2 px-4 text-gray-500 mt-4">
              <img 
                src={coach.avatar || '/default-avatar.png'} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full"
              />
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      <div ref={inputRef}>
        <ChatInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          onAttachmentClick={() => fileInputRef.current?.click()}
          disabled={shouldShowPremium}
          hasAttachment={!!selectedFile}
        />
      </div>

      <AnimatePresence>
        {showGiftMenu && !shouldShowPremium && (
          <GiftMenu
            onGiftSelect={handleGiftSelect}
            onClose={() => setShowGiftMenu(false)}
          />
        )}
      </AnimatePresence>

      {shouldShowPremium && (
        <PremiumBanner 
          onBack={onBack} 
          onUpgrade={() => navigate('/premium')} 
        />
      )}
    </div>
  );
}