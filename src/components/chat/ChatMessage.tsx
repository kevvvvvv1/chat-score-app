import { motion } from 'framer-motion';
import { useState } from 'react';
import ImageViewer from './ImageViewer';

interface Message {
  id: string;
  content: string;
  senderId: string;
  image?: {
    data: string;
    type: string;
  };
  timestamp: string;
  type?: string;
}

interface ChatMessageProps {
  message: Message;
  isUser: boolean;
  avatar?: string;
  isPremium?: boolean;
}

const ChatMessage = ({ message, isUser, avatar, isPremium }: ChatMessageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  if (!message?.content && !message?.image) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-2`}
    >
      {!isUser && (
        <img src={avatar || '/default-avatar.png'} alt="Avatar" className="w-8 h-8 rounded-full" />
      )}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`relative max-w-[70%] rounded-lg p-3 ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
          }`}
        >
          {message.image && (
            <div className="mb-2">
              <img 
                src={message.image.data} 
                alt="Image envoyée" 
                className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                style={{ maxHeight: '200px', objectFit: 'contain' }}
                onClick={() => setSelectedImage(message.image.data)}
              />
            </div>
          )}
          {message.content && (
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          )}

          <span 
            className={`block text-xs mt-1 ${
              isUser 
                ? 'text-white/70' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>

      {isUser && (
        <img src={avatar || '/default-avatar.png'} alt="Avatar" className={`w-8 h-8 rounded-full ${!isPremium && 'opacity-50'}`} />
      )}
      
      {selectedImage && (
        <ImageViewer
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </motion.div>
  );
};

export default ChatMessage;