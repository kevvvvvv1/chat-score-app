import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faUser,
  faComments,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../stores/authStore';
import AvatarWithBadge from '../chat/AvatarWithBadge';

export default function BottomNav() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex justify-around items-center h-16">
      <Link
        to="/chat"
        className={`flex flex-col items-center space-y-1 ${
          isActive('/chat')
            ? 'text-primary'
            : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        <FontAwesomeIcon icon={faComments} className="text-xl" />
        <span className="text-xs">Chats</span>
      </Link>

      <Link
        to="/score"
        className={`flex flex-col items-center space-y-1 ${
          isActive('/score')
            ? 'text-primary'
            : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        <FontAwesomeIcon icon={faChartLine} className="text-xl" />
        <span className="text-xs">Score</span>
      </Link>

      <Link
        to="/personality"
        className={`flex flex-col items-center space-y-1 ${
          isActive('/personality')
            ? 'text-primary'
            : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        {isAuthenticated && user ? (
          <AvatarWithBadge
            src={user.avatar || '/default-avatar.png'}
            alt={user.name || 'User'}
            size="small"
            showOnlineBadge={false}
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="text-xl" />
        )}
        <span className="text-xs">Profil</span>
      </Link>
    </div>
  );
}