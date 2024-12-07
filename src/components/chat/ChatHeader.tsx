import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faEllipsisVertical,
  faCircle,
  faFlag,
  faTrash,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import AvatarWithBadge from './AvatarWithBadge';
import { Coach } from '../../types/coach';
import { useChatStore } from '../../stores/chatStore';
import ProfileModal from '../profile/ProfileModal';

interface ChatHeaderProps {
  coach?: Coach;
  onBack?: () => void;
}

const ChatHeader = ({ coach, onBack }: ChatHeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { toggleUnread } = useChatStore();

  if (!coach) return null;
  
  const handleOptionClick = (action: string) => {
    switch (action) {
      case 'profile':
        setShowProfile(true);
        break;
      case 'unread':
        toggleUnread(coach.id);
        break;
      case 'spam':
        // TODO: Implémenter la fonctionnalité de signalement
        alert('Conversation signalée comme spam');
        break;
      case 'delete':
        // TODO: Implémenter la suppression de conversation
        alert('Conversation supprimée');
        break;
    }
    setShowMenu(false);
  };
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-4 flex items-center gap-4 shadow-sm">
        {onBack && (
          <button onClick={onBack} className="text-gray-600 dark:text-gray-300">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        <AvatarWithBadge src={coach.avatar} alt={coach.name} isPremium={true} />
        <div className="flex-1">
          <h2 className="font-semibold dark:text-white">{coach.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {coach.isOnline ? 'En ligne' : 'Hors ligne'}
          </p>
        </div>
        
        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50"
              >
                <div className="py-1">
                  <button
                    onClick={() => handleOptionClick('profile')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Voir le profil
                  </button>
                  <button
                    onClick={() => handleOptionClick('unread')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <FontAwesomeIcon icon={faCircle} className="mr-2" />
                    Marquer comme non lu
                  </button>
                  <button
                    onClick={() => handleOptionClick('spam')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <FontAwesomeIcon icon={faFlag} className="mr-2" />
                    Signaler comme spam
                  </button>
                  <button
                    onClick={() => handleOptionClick('delete')}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Supprimer la conversation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal coach={coach} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default ChatHeader;