import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AvatarWithBadge } from './AvatarWithBadge';
import { Coach } from '../../types/coach';

interface ChatHeaderProps {
  coach: Coach;
  onBack: () => void;
}

export function ChatHeader({ coach, onBack }: ChatHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 flex items-center gap-4 shadow-sm">
      <button onClick={onBack} className="text-gray-600 dark:text-gray-300">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <AvatarWithBadge src={coach.avatar} alt={coach.name} isPremium={true} />
      <div>
        <h2 className="font-semibold dark:text-white">{coach.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {coach.isOnline ? 'En ligne' : 'Hors ligne'}
        </p>
      </div>
    </div>
  );
}