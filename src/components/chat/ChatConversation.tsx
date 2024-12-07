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
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { messages: allMessages, addMessage, isLimited, setLimited } = useChatStore();

  // Gérer la hauteur du viewport pour le mobile
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    // Gérer les changements de hauteur du viewport (clavier mobile)
    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim() && !selectedFile) return;

    let messageContent = text;
    
    // Si on a une image sélectionnée, on utilise directement l'URL base64
    if (selectedFile && previewUrl) {
      messageContent = `<img src="${previewUrl}" alt="Image envoyée" class="max-w-xs rounded-lg" />`;
      if (text.trim()) {
        messageContent += `\n${text}`;
      }
    }

    const message = {
      id: `${Date.now()}-user`,
      chatId: coach.id,
      content: messageContent,
      timestamp: new Date().toISOString(),
      senderId: 'user',
      receiverId: coach.id,
      type: selectedFile ? 'image' : 'text'
    };

    addMessage(message);
    setNewMessage('');
    setSelectedFile(null);
    setPreviewUrl(null);
    scrollToBottom();

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    // Convertir l'image en base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setSelectedFile(file);
      setPreviewUrl(base64);
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      alert('Erreur lors de la lecture du fichier');
    };
    reader.readAsDataURL(file);
  };

  const handleGiftSelect = (gift: Gift) => {
    const giftMessage = `🎁 A envoyé un cadeau : ${gift.name} (${gift.price} crédits)`;
    handleSendMessage(giftMessage);
    setShowGiftMenu(false);
  };

  return (
    <div className="flex flex-col h-full max-h-[100dvh] bg-gray-50 dark:bg-gray-900">
      <ChatHeader coach={coach} onBack={onBack} />
      
      <div className="flex-1 overflow-y-auto pb-[120px]">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isUser={message.senderId === 'user'}
              avatar={message.senderId === 'user' ? (user?.avatar || '/default-avatar.png') : (coach.avatar || '/default-avatar.png')}
              isPremium={message.senderId === 'user' ? isPremium : true}
            />
          ))}
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
      </div>

      {/* Input caché pour la sélection de fichier */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        onClick={e => e.stopPropagation()}
      />

      <div className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {previewUrl && (
          <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2">
              <div className="relative inline-block">
                <img 
                  src={previewUrl} 
                  alt="Aperçu" 
                  className="max-h-32 rounded-lg"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
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
          onAttachmentClick={handleAttachmentClick}
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