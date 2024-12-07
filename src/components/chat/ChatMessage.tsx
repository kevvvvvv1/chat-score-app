import { motion } from 'framer-motion';
import { AvatarWithBadge } from './AvatarWithBadge';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    senderId: string;
    timestamp: Date;
    senderAvatar: string;
    isPremium: boolean;
  };
  isCurrentUser: boolean;
}

export function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${
        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
      } mb-4`}
    >
      <AvatarWithBadge 
        src={message.senderAvatar} 
        alt="Avatar" 
        isPremium={!isCurrentUser}
      />
      <div
        className={`relative max-w-[70%] p-4 rounded-2xl ${
          isCurrentUser
            ? 'bg-primary text-white'
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
        }`}
      >
        <div className="mb-1">{message.text}</div>
        <div 
          className={`text-xs ${
            isCurrentUser 
              ? 'text-white/70' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </motion.div>
  );
}