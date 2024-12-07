import { useState } from 'react';

const EMOJI_CATEGORIES = {
  'Smileys': ['😊', '😂', '🥰', '😍', '😘', '😋', '😎', '🤗', '🤔', '😴'],
  'Gestes': ['👍', '👎', '👋', '✌️', '🤝', '👏', '🙌', '💪', '🤲', '🤌'],
  'Coeurs': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💖'],
};

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  const [activeCategory, setActiveCategory] = useState('Smileys');

  return (
    <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-72 z-50">
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Emojis</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {Object.keys(EMOJI_CATEGORIES).map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              activeCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Emojis Grid */}
      <div className="grid grid-cols-5 gap-2">
        {EMOJI_CATEGORIES[activeCategory as keyof typeof EMOJI_CATEGORIES].map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            className="text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}