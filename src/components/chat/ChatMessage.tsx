import { motion } from 'framer-motion';

interface ChatMessageProps {
  content: string;
  timestamp: Date;
  isUser: boolean;
  avatar?: string;
  isPremium?: boolean;
}

const ChatMessage = ({ content, timestamp, isUser, avatar, isPremium }: ChatMessageProps) => {
  if (!content) return null;
  
  return (
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
        <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        <span 
          className={`block text-xs mt-1 ${
            isUser 
              ? 'text-white/70' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {timestamp instanceof Date ? timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : ''}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;