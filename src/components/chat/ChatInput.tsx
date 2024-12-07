import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperclip, 
  faFaceSmile,
  faPaperPlane,
  faGift
} from '@fortawesome/free-solid-svg-icons';

interface ChatInputProps {
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onEmojiClick: () => void;
  onGiftClick: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export function ChatInput({
  newMessage,
  onMessageChange,
  onSendMessage,
  onEmojiClick,
  onGiftClick,
  onKeyPress
}: ChatInputProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2">
        <button 
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2"
          onClick={onEmojiClick}
        >
          <FontAwesomeIcon icon={faFaceSmile} />
        </button>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2">
          <FontAwesomeIcon icon={faPaperclip} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Écrivez votre message..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button 
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2"
          onClick={onGiftClick}
        >
          <FontAwesomeIcon icon={faGift} />
        </button>
        <button
          onClick={onSendMessage}
          className="text-primary hover:text-primary/80 p-2"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}