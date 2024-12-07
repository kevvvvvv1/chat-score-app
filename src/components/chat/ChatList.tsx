import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faEllipsisVertical, 
  faThumbtack,
  faCircle,
  faTrash,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import { useChatStore } from '../../stores/chatStore';

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isPinned?: boolean;
  isTyping?: boolean;
}

interface ChatListProps {
  pinnedChats: ChatMessage[];
  allChats: ChatMessage[];
  onChatSelect: (chatId: string) => void;
}

export default function ChatList({ pinnedChats, allChats, onChatSelect }: ChatListProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { togglePin, isPinned } = useChatStore();

  const ChatItem = ({ chat }: { chat: ChatMessage }) => {
    const handleOptionClick = (e: React.MouseEvent, action: string) => {
      e.stopPropagation();
      
      if (action === 'pin') {
        togglePin(chat.id);
      }
      
      setActiveMenu(null);
    };

    return (
      <motion.div
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        onClick={() => onChatSelect(chat.id)}
        className="flex items-center gap-4 p-4 cursor-pointer rounded-lg relative"
      >
        <div className="relative">
          <img
            src={chat.user.avatar}
            alt={chat.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {chat.user.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {chat.user.name}
              </h3>
              {isPinned(chat.id) && (
                <FontAwesomeIcon 
                  icon={faThumbtack} 
                  className="text-xs text-gray-500 dark:text-gray-400" 
                />
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {chat.timestamp}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {chat.isTyping ? (
              <span className="text-primary">is typing ...</span>
            ) : (
              chat.lastMessage
            )}
          </p>
        </div>

        {chat.unreadCount && (
          <div className="min-w-[20px] h-5 bg-primary rounded-full flex items-center justify-center px-1.5">
            <span className="text-xs text-white font-medium">
              {chat.unreadCount}
            </span>
          </div>
        )}
        
        {chat.isTyping === false && (
          <div className="text-gray-400 dark:text-gray-600">
            <FontAwesomeIcon icon={faCheck} className="text-xs" />
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(activeMenu === chat.id ? null : chat.id);
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-500 dark:text-gray-400" />
        </button>

        <AnimatePresence>
          {activeMenu === chat.id && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden"
            >
              <div className="py-1">
                <button
                  onClick={(e) => handleOptionClick(e, 'mark-unread')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faCircle} className="text-xs" />
                  <span>Marquer comme non lu</span>
                </button>
                <button
                  onClick={(e) => handleOptionClick(e, 'pin')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faThumbtack} />
                  <span>
                    {isPinned(chat.id) ? 'Désépingler' : 'Épingler'} la conversation
                  </span>
                </button>
                <button
                  onClick={(e) => handleOptionClick(e, 'delete')}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Supprimer</span>
                </button>
                <button
                  onClick={(e) => handleOptionClick(e, 'report')}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faFlag} />
                  <span>Signaler comme spam</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      {pinnedChats.length > 0 && (
        <div className="mb-4">
          <h2 className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Conversations épinglées
          </h2>
          {pinnedChats.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      )}

      <div>
        <h2 className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          Autres conversations
        </h2>
        {allChats.map(chat => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}