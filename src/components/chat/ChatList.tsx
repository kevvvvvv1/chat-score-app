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
    bio: string;
  };
  timestamp: string;
  unreadCount?: number;
  isPinned?: boolean;
  isTyping?: boolean;
  lastMessage: string;
}

interface ChatListProps {
  pinnedChats: ChatMessage[];
  allChats: ChatMessage[];
  onChatSelect: (chatId: string) => void;
}

export default function ChatList({ pinnedChats, allChats, onChatSelect }: ChatListProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { togglePin, isPinned, toggleUnread, unreadChats } = useChatStore();

  // Séparer les chats non épinglés en ligne et hors ligne
  const onlineChats = allChats.filter(chat => chat.user.isOnline);
  const offlineChats = allChats.filter(chat => !chat.user.isOnline);

  const ChatItem = ({ chat }: { chat: ChatMessage }) => {
    const isUnread = unreadChats.includes(chat.id);

    const handleOptionClick = (e: React.MouseEvent, action: string) => {
      e.stopPropagation();
      
      if (action === 'pin') {
        togglePin(chat.id);
      } else if (action === 'unread') {
        toggleUnread(chat.id);
      }
      
      setActiveMenu(null);
    };

    return (
      <motion.div
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        className="relative flex items-center p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700"
        onClick={() => onChatSelect(chat.id)}
      >
        <div className="relative">
          <img
            src={chat.user.avatar}
            alt={chat.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {chat.user.isOnline && (
            <div className="absolute bottom-0 right-0">
              <FontAwesomeIcon 
                icon={faCircle} 
                className="text-green-500 text-xs"
              />
            </div>
          )}
        </div>

        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-semibold text-gray-900 dark:text-gray-100 ${isUnread ? 'font-bold' : ''}`}>
              {chat.user.name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {chat.timestamp}
            </span>
          </div>

          <div className="flex justify-between items-center mt-1">
            <p className={`text-sm text-gray-600 dark:text-gray-300 line-clamp-1 ${isUnread ? 'font-bold' : ''}`}>
              {chat.isTyping ? (
                <span className="text-blue-500">typing...</span>
              ) : chat.lastMessage ? (
                chat.lastMessage
              ) : (
                <span className="text-gray-500 dark:text-gray-400 italic">
                  {chat.user.bio}
                </span>
              )}
            </p>
            {isUnread && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                •
              </span>
            )}
          </div>
        </div>

        {isPinned(chat.id) && (
          <div className="absolute top-2 right-2">
            <FontAwesomeIcon 
              icon={faThumbtack} 
              className="text-blue-500 text-xs transform rotate-45"
            />
          </div>
        )}

        <div className="relative ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === chat.id ? null : chat.id);
            }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-500" />
          </button>

          <AnimatePresence>
            {activeMenu === chat.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10"
              >
                <div className="py-1">
                  <button
                    onClick={(e) => handleOptionClick(e, 'pin')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <FontAwesomeIcon icon={faThumbtack} className="mr-2" />
                    {isPinned(chat.id) ? 'Désépingler' : 'Épingler'}
                  </button>
                  <button
                    onClick={(e) => handleOptionClick(e, 'unread')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <FontAwesomeIcon icon={faCircle} className="mr-2" />
                    Marquer comme non lu
                  </button>
                  <button
                    onClick={(e) => handleOptionClick(e, 'delete')}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </button>
                  <button
                    onClick={(e) => handleOptionClick(e, 'report')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <FontAwesomeIcon icon={faFlag} className="mr-2" />
                    Report
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {pinnedChats.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Épinglés
            </span>
          </div>
          {pinnedChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      )}

      {onlineChats.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              En ligne
            </span>
          </div>
          {onlineChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      )}

      {offlineChats.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Hors ligne
            </span>
          </div>
          {offlineChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      )}
    </div>
  );
}