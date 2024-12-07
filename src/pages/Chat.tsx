import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { coaches } from '../data/coaches';
import ChatList from '../components/chat/ChatList';
import { ChatConversation } from '../components/chat/ChatConversation';
import { Coach } from '../types/coach';
import { useChatStore } from '../stores/chatStore';

export default function Chat() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { pinnedChats } = useChatStore();

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
    .map(coach => ({
      id: coach.id,
      user: {
        name: coach.name,
        avatar: coach.avatar,
        isOnline: coach.isOnline
      },
      lastMessage: coach.bio,
      timestamp: '09:41',
      isTyping: false,
      isPinned: true
    }));

  const unpinnedChats = coaches
    .filter(coach => !pinnedChats.includes(coach.id))
    .filter(coach => 
      !searchQuery || 
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.bio.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(coach => ({
      id: coach.id,
      user: {
        name: coach.name,
        avatar: coach.avatar,
        isOnline: coach.isOnline
      },
      lastMessage: coach.bio,
      timestamp: '12:23',
      isTyping: false,
      isPinned: false
    }));

  if (selectedCoach) {
    return (
      <ChatConversation 
        coach={selectedCoach} 
        onBack={() => setSelectedCoach(null)} 
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        {!showSearch ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <h1 className="text-xl font-semibold dark:text-white">Chats</h1>
            </div>
            
            <button 
              onClick={() => setShowSearch(true)}
              className="text-gray-600 dark:text-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une conversation..."
                className="w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery('');
              }}
              className="text-gray-600 dark:text-gray-400"
            >
              Annuler
            </button>
          </div>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <ChatList 
          pinnedChats={pinnedChatsList}
          allChats={unpinnedChats}
          onChatSelect={(chatId) => {
            const coach = coaches.find(c => c.id === chatId);
            if (coach) setSelectedCoach(coach);
          }}
        />
      </div>
    </div>
  );
}