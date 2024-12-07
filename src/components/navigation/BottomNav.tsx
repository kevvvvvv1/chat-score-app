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
  
  // Ne pas afficher la navigation sur la page d'accueil
  if (location.pathname === '/') {
    return null;
  }

  const { isAuthenticated, user } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4">
      <div className="container mx-auto px-4">
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
            to={isAuthenticated ? '/profile' : '/register'}
            className={`flex flex-col items-center space-y-1 ${
              isActive('/profile')
                ? 'text-primary'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <div className="relative">
              {user?.avatar ? (
                <AvatarWithBadge
                  src={user.avatar}
                  alt={user.username}
                  isPremium={false}
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
              )}
            </div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}