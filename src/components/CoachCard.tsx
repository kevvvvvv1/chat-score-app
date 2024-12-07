import { Coach } from '../types/coach';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

interface CoachCardProps {
  coach: Coach;
  onChatClick: (coachId: string) => void;
}

export default function CoachCard({ coach, onChatClick }: CoachCardProps) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleChatClick = () => {
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }
    onChatClick(coach.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="relative">
        <img
          src={coach.avatar}
          alt={coach.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <span
          className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
            coach.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`}
        ></span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{coach.name}</h3>
          <span className="text-gray-600">{coach.age} ans</span>
        </div>
        <p className="text-gray-600 mb-2">{coach.bio}</p>
        <p className="text-sm text-gray-500 mb-4">Style: {coach.style}</p>
        <button
          onClick={handleChatClick}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Commencer le chat
        </button>
      </div>
    </div>
  );
}