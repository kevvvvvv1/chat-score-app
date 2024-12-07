import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { coaches } from '../data/coaches';
import ChatList from '../components/chat/ChatList';
import ChatConversation from '../components/chat/ChatConversation';
import { Coach } from '../types/coach';
import { useChatStore } from '../stores/chatStore';
import { useNavigationStore } from '../stores/navigationStore';

export default function Chat() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { pinnedChats, messages, getLastMessage, clearMessages } = useChatStore();
  const { setInChatConversation } = useNavigationStore();

  const filterCoaches = (coaches: Coach[]) => {
    if (!searchQuery) return coaches;
    return coaches.filter(coach => 
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const onlineCoaches = filterCoaches(coaches.filter(coach => coach.isOnline));
  const offlineCoaches = filterCoaches(coaches.filter(coach => !coach.isOnline));

  const pinnedChatsList = coaches
    .filter(coach => pinnedChats.includes(coach.id))
    .filter(coach => 
      !searchQuery || 
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.bio.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(coach => {
      const lastMsg = getLastMessage(coach.id);
      return {
        id: coach.id,
        user: {
          name: coach.name,
          avatar: coach.avatar || '/default-avatar.png',
          isOnline: coach.isOnline,
          bio: coach.bio
        },
        timestamp: lastMsg?.timestamp ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        isTyping: false,
        isPinned: true,
        unreadCount: 0,
        lastMessage: lastMsg?.content || ''
      };
    });

  const unpinnedChats = coaches
    .filter(coach => !pinnedChats.includes(coach.id))
    .filter(coach => 
      !searchQuery || 
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.bio.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(coach => {
      const lastMsg = getLastMessage(coach.id);
      return {
        id: coach.id,
        user: {
          name: coach.name,
          avatar: coach.avatar || '/default-avatar.png',
          isOnline: coach.isOnline,
          bio: coach.bio
        },
        timestamp: lastMsg?.timestamp ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        isTyping: false,
        isPinned: false,
        unreadCount: 0,
        lastMessage: lastMsg?.content || ''
      };
    });

  const handleSelectCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setInChatConversation(true);
  };

  const handleBack = () => {
    setSelectedCoach(null);
    setInChatConversation(false);
  };

  return (
    <div className="h-full flex">
      {!selectedCoach ? (
        <div className="w-full md:w-96 h-full border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Messages</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Voulez-vous vraiment supprimer toutes les conversations ?')) {
                    clearMessages();
                  }
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <FontAwesomeIcon icon={faTrash} className="text-gray-500 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <FontAwesomeIcon icon={faSearch} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          )}

          <ChatList
            pinnedChats={pinnedChatsList}
            allChats={unpinnedChats}
            onChatSelect={(chatId) => {
              const coach = coaches.find(c => c.id === chatId);
              if (coach) {
                handleSelectCoach(coach);
              }
            }}
          />
        </div>
      ) : (
        <>
          <div className="w-full md:w-96 h-full border-r border-gray-200 dark:border-gray-700 hidden md:flex md:flex-col">
            <ChatList
              pinnedChats={pinnedChatsList}
              allChats={unpinnedChats}
              onChatSelect={(chatId) => {
                const coach = coaches.find(c => c.id === chatId);
                if (coach) {
                  handleSelectCoach(coach);
                }
              }}
            />
          </div>
          <div className="flex-1 h-full flex flex-col">
            <ChatConversation 
              coach={selectedCoach} 
              onBack={handleBack} 
            />
          </div>
        </>
      )}
    </div>
  );
}