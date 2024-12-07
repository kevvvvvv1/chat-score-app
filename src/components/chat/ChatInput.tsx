import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperclip, 
  faFaceSmile,
  faPaperPlane,
  faGift
} from '@fortawesome/free-solid-svg-icons';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  onEmojiClick: () => void;
  onGiftClick: () => void;
  showEmojiPicker: boolean;
  showGiftMenu: boolean;
}

const ChatInput = ({
  value,
  onChange,
  onSend,
  onEmojiClick,
  onGiftClick,
  showEmojiPicker,
  showGiftMenu
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4">
      <div className="flex items-center gap-2">
        <button 
          onClick={onEmojiClick}
          className={`p-2 rounded-full transition-colors ${
            showEmojiPicker 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-500' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <FontAwesomeIcon icon={faFaceSmile} />
        </button>

        <button 
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faPaperclip} />
        </button>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Écrivez votre message..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
          onClick={onGiftClick}
          className={`p-2 rounded-full transition-colors ${
            showGiftMenu 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-500' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <FontAwesomeIcon icon={faGift} />
        </button>

        <button
          onClick={() => onSend(value)}
          disabled={!value.trim()}
          className={`p-2 rounded-full transition-colors ${
            value.trim()
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;