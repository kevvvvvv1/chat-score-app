import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../stores/authStore';

function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <FontAwesomeIcon 
            icon={faHeart} 
            className="text-primary text-xl" 
          />
          <span className="text-xl font-bold text-white">
            Chatfresh
          </span>
        </Link>
        
        {!isAuthenticated && (
          <Link
            to="/login"
            className="text-white hover:text-primary font-medium transition-colors"
          >
            Se connecter
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;