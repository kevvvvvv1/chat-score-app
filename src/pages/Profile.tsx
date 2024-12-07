import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoon, 
  faSun, 
  faSignOutAlt, 
  faCamera, 
  faPencil,
  faCrown,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import Card from '../components/ui/Card';
import SubscriptionBadge from '../components/profile/SubscriptionBadge';

function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    gender: user?.gender || '',
    birthDate: user?.birthDate || '',
    password: '',
    newPassword: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      username: formData.username,
      email: formData.email,
      gender: formData.gender as 'male' | 'female' | 'other',
      birthDate: formData.birthDate
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="p-6 mb-6">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-full h-full rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
            <FontAwesomeIcon icon={faCamera} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <SubscriptionBadge isPremium={false} />
          
          <button
            onClick={() => navigate('/premium')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            <FontAwesomeIcon icon={faCrown} />
            <span>Passer en Premium</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {!isEditing ? (
          <div className="text-center mt-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-2xl font-bold dark:text-white">{user?.username}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {user?.email}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Genre: {user?.gender}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Date de naissance: {new Date(user?.birthDate || '').toLocaleDateString()}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Genre
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionner</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date de naissance
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white p-2 rounded-lg hover:bg-opacity-90"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </Card>

      {/* Settings */}
      <Card className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon 
              icon={isDarkMode ? faMoon : faSun} 
              className="text-xl text-gray-600 dark:text-gray-400" 
            />
            <span className="font-medium dark:text-white">
              Mode sombre
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {isDarkMode ? 'Activé' : 'Désactivé'}
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full p-4 flex items-center gap-3 text-red-600 dark:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
          <span className="font-medium">Se déconnecter</span>
        </button>
      </Card>
    </div>
  );
}

export default Profile;