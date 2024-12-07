import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';

interface AvatarWithBadgeProps {
  src: string;
  alt: string;
  isPremium: boolean;
}

export function AvatarWithBadge({ src, alt, isPremium }: AvatarWithBadgeProps) {
  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className="w-10 h-10 rounded-full object-cover"
      />
      {isPremium && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
          <FontAwesomeIcon icon={faDiamond} className="text-[10px] text-white" />
        </div>
      )}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] px-2 py-0.5 rounded-full bg-gray-500/90 text-white font-medium">
        {isPremium ? 'PREMIUM' : 'FREE'}
      </span>
    </div>
  );
}