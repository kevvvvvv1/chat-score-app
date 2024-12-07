import { useState, useEffect } from 'react';
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
  const { togglePin, isPinned, toggleUnread, unreadChats, getLastMessage } = useChatStore();

  // Fonction de tri par date du dernier message
  const sortByLastMessage = (a: ChatMessage, b: ChatMessage) => {
    const lastMessageA = getLastMessage(a.id);
    const lastMessageB = getLastMessage(b.id);
    
    if (!lastMessageA && !lastMessageB) return 0;
    if (!lastMessageA) return 1;
    if (!lastMessageB) return -1;
    
    return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
  };

  // Trier les chats épinglés par dernier message
  const sortedPinnedChats = [...pinnedChats].sort(sortByLastMessage);

  // Séparer et trier les chats non épinglés en ligne et hors ligne
  const onlineChats = allChats
    .filter(chat => chat.user.isOnline)
    .sort(sortByLastMessage);
  const offlineChats = allChats
    .filter(chat => !chat.user.isOnline)
    .sort(sortByLastMessage);

  const getInitialIndex = (chatId: string) => {
    return initialOrder.indexOf(chatId);
  };

  const sortByInitialOrder = (a: ChatMessage, b: ChatMessage) => {
    return getInitialIndex(a.id) - getInitialIndex(b.id);
  };

  const [initialOrder, setInitialOrder] = useState<string[]>([]);

  useEffect(() => {
    const sortByTimestamp = (a: ChatMessage, b: ChatMessage) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    };

    const allSortedChats = [...pinnedChats, ...allChats].sort(sortByTimestamp);
    setInitialOrder(allSortedChats.map(chat => chat.id));
  }, []); 

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
        className="relative flex items-start p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700"
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

        <div className="ml-4 flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <div className="min-w-0 flex-1">
              <h3 className={`font-semibold text-gray-900 dark:text-gray-100 ${isUnread ? 'font-bold' : ''} truncate`}>
                {chat.user.name}
              </h3>
              <div className="mt-1">
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
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 h-12">
              <span className="text-sm text-gray-500 dark:text-gray-400 w-16 text-right">
                {chat.timestamp}
              </span>
              <button
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === chat.id ? null : chat.id);
                }}
              >
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="text-gray-500 dark:text-gray-400 w-4 h-4"
                />
              </button>
            </div>
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
      </motion.div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {sortedPinnedChats.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Épinglés
            </span>
          </div>
          {sortedPinnedChats.map((chat) => (
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