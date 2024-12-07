import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Coach } from '../../types/coach';
import { useAuthStore } from '../../stores/authStore';
import { useChatStore } from '../../stores/chatStore';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import PremiumBanner from './PremiumBanner';
import GiftMenu, { Gift } from './GiftMenu';

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
  const [newMessage, setNewMessage] = useState('');
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
  const [isCoachTyping, setIsCoachTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [messageAreaHeight, setMessageAreaHeight] = useState('100vh');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { messages: allMessages, addMessage, isLimited, setLimited } = useChatStore();

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const inputHeight = inputRef.current?.offsetHeight || 0;
      const newHeight = `calc(100vh - ${headerHeight}px - ${inputHeight}px)`;
      setMessageAreaHeight(newHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Filtrer les messages pour ce coach
  const messages = allMessages.filter(msg => msg.chatId === coach.id);
  
  // Compter les messages de l'utilisateur dans cette conversation
  const userMessageCount = messages.filter(msg => msg.senderId === 'user').length;

  // Considérer l'utilisateur comme premium par défaut si non défini
  const isPremium = user?.isPremium ?? true;
  
  // Vérifier si la conversation est limitée
  const shouldShowPremium = !isPremium && isLimited(coach.id);

  useEffect(() => {
    // Ne pas limiter si l'utilisateur est premium ou si le statut n'est pas encore chargé
    if (isPremium || userMessageCount < 4) {
      return;
    }

    // Si l'utilisateur atteint la limite et n'est pas premium, marquer la conversation comme limitée
    if (!isLimited(coach.id)) {
      setLimited(coach.id);
      setShowPremiumBanner(true);
    }
  }, [userMessageCount, isPremium, coach.id, isLimited, setLimited]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !selectedFile) || shouldShowPremium) return;

    // Vérifier la longueur du message
    if (newMessage.length > 1000) {
      alert('Le message ne peut pas dépasser 1000 caractères');
      return;
    }

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
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      alert('Seules les images sont acceptées');
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux (max 5MB)');
      return;
    }

    // Convertir en base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreviewUrl(base64);
      setSelectedFile(file);
    };
    reader.onerror = () => {
      alert('Erreur lors de la lecture du fichier');
    };
    reader.readAsDataURL(file);
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGiftSelect = (gift: Gift) => {
    const giftMessage = `🎁 A envoyé un cadeau : ${gift.name} (${gift.price} crédits)`;
    handleSendMessage(giftMessage);
    setShowGiftMenu(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div ref={headerRef}>
        <ChatHeader coach={coach} onBack={onBack} />
      </div>
      
      <div 
        className="flex-1 overflow-y-auto relative scroll-smooth"
        style={{ height: messageAreaHeight }}
      >
        <div className="py-4 h-full flex flex-col justify-end">
          {messages.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
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
            <div className="flex items-center gap-2 px-4 text-gray-500">
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

      {/* Input caché pour la sélection de fichier */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
        onClick={e => e.stopPropagation()}
      />

      <div ref={inputRef} className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {previewUrl && (
          <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2">
              <div className="relative inline-block">
                <img 
                  src={previewUrl} 
                  alt="Aperçu" 
                  className="max-h-32 rounded-lg"
                  onError={() => {
                    // Si l'image ne peut pas être chargée, nettoyer la prévisualisation
                    clearFileSelection();
                  }}
                />
                <button
                  onClick={clearFileSelection}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {showPremiumBanner && (
          <PremiumBanner onClose={() => setShowPremiumBanner(false)} />
        )}

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
    </div>
  );
}