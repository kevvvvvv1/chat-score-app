import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { faGem } from '@fortawesome/free-regular-svg-icons';

interface SubscriptionBadgeProps {
  isPremium: boolean;
}

export default function SubscriptionBadge({ isPremium }: SubscriptionBadgeProps) {
  return (
    <div className={`
      px-4 py-2 rounded-full 
      ${isPremium 
        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' 
        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
      }
      flex items-center gap-2 font-medium text-sm
    `}>
      <FontAwesomeIcon 
        icon={isPremium ? faCrown : faGem} 
        className={isPremium ? 'text-white' : 'text-gray-500 dark:text-gray-400'} 
      />
      {isPremium ? 'Premium' : 'Free'}
    </div>
  );
}