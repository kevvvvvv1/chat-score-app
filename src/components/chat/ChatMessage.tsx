import { motion } from 'framer-motion';
import { useState } from 'react';
import ImageViewer from './ImageViewer';

interface ChatMessageProps {
  message: {
    content: string;
    timestamp: string;
    senderId: string;
    type?: string;
  };
  isUser: boolean;
  avatar?: string;
  isPremium?: boolean;
}

const ChatMessage = ({ message, isUser, avatar, isPremium }: ChatMessageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  if (!message?.content) return null;

  // Extraire l'URL de l'image si c'est un message avec image
  const imageMatch = message.content.match(/<img[^>]+src="([^">]+)"/);
  const imageUrl = imageMatch ? imageMatch[1] : null;
  const textContent = message.content.replace(/<img[^>]+>/, '').trim();
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="flex flex-col items-center gap-1">
          <img
            src={avatar || '/default-avatar.png'}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span 
            className={`text-xs ${
              isPremium 
                ? 'text-yellow-500 dark:text-yellow-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {isPremium ? 'Premium' : 'Free'}
          </span>
        </div>
        
        <div
          className={`relative max-w-[70%] px-4 py-2 rounded-2xl ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
          }`}
        >
          {imageUrl && (
            <div className="mb-2">
              <img
                src={imageUrl}
                alt="Image du message"
                className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                style={{ maxHeight: '200px', objectFit: 'contain' }}
                onClick={() => setSelectedImage(imageUrl)}
              />
            </div>
          )}
          
          {textContent && (
            <p className="text-sm whitespace-pre-wrap break-words">{textContent}</p>
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
      </motion.div>

      {selectedImage && (
        <ImageViewer
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default ChatMessage;