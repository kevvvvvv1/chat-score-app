import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faDiamond, faCrown, faHeart } from '@fortawesome/free-solid-svg-icons';

export interface Gift {
  id: string;
  icon: typeof faGift;
  name: string;
  price: number;
}

export interface GiftMenuProps {
  onGiftSelect: (gift: Gift) => void;
  onClose: () => void;
}

export default function GiftMenu({ onGiftSelect, onClose }: GiftMenuProps) {
  const gifts: Gift[] = [
    { id: '1', icon: faGift, name: 'Cadeau', price: 100 },
    { id: '2', icon: faDiamond, name: 'Diamant', price: 500 },
    { id: '3', icon: faCrown, name: 'Couronne', price: 1000 },
    { id: '4', icon: faHeart, name: 'Coeur', price: 250 },
  ];

  return (
    <div className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-72 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Cadeaux</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {gifts.map((gift) => (
          <button
            key={gift.id}
            onClick={() => {
              onGiftSelect(gift);
              onClose();
            }}
            className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <FontAwesomeIcon 
              icon={gift.icon} 
              className="text-2xl text-yellow-500 mb-2" 
            />
            <span className="text-sm font-medium dark:text-white">
              {gift.name}
            </span>
            <span className="text-xs font-medium text-yellow-500 dark:text-yellow-400">
              {gift.price} 💎
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}