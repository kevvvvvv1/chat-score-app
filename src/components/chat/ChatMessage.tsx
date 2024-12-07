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

export function ChatMessage({ message, isUser, avatar, isPremium }: ChatMessageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  if (!message?.content && !message?.image) return null;

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-2 px-4`}
    >
      {!isUser && avatar && (
        <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full flex-shrink-0" />
      )}
      {!isUser && !avatar && (
        <div className="w-8 flex-shrink-0" />
      )}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%] min-w-0`}>
        <div
          className={`relative rounded-lg p-3 overflow-hidden ${
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
            <p className="text-sm whitespace-pre-wrap break-all overflow-wrap-anywhere">{message.content}</p>
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
        <img src={avatar || '/default-avatar.png'} alt="Avatar" className={`w-8 h-8 rounded-full flex-shrink-0 ${!isPremium && 'opacity-50'}`} />
      )}
      
      {selectedImage && (
        <ImageViewer
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default ChatMessage;