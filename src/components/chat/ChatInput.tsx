import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperclip, 
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  onAttachmentClick?: () => void;
  disabled?: boolean;
  hasAttachment?: boolean;
}

const ChatInput = ({
  value,
  onChange,
  onSend,
  onAttachmentClick,
  disabled,
  hasAttachment
}: ChatInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() || hasAttachment) {
        console.log('ChatInput: sending via Enter key');
        onSend(value);
      }
    }
  };

  const handleSend = (e: React.MouseEvent) => {
    console.log('ChatInput: handleSend called', { value, hasAttachment });
    e.preventDefault();
    e.stopPropagation();
    if (value.trim() || hasAttachment) {
      console.log('ChatInput: calling onSend');
      onSend(value);
    } else {
      console.log('ChatInput: no content to send');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Input value changing to:', e.target.value);
    if (e.target.value.length <= 1000) {
      onChange(e.target.value);
    }
  };

  const handleAttachmentClick = (e: React.MouseEvent) => {
    console.log('ChatInput: handleAttachmentClick called');
    if (onAttachmentClick) {
      console.log('ChatInput: calling parent onAttachmentClick');
      onAttachmentClick();
    } else {
      console.log('ChatInput: onAttachmentClick prop is undefined');
    }
  };

  const hasContent = value.trim().length > 0 || hasAttachment;

  return (
    <div className="relative p-2">
      <div className="flex items-end gap-2">
        <button
          onClick={handleAttachmentClick}
          className={`p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={disabled}
        >
          <FontAwesomeIcon icon={faPaperclip} className={hasAttachment ? 'text-primary' : ''} />
        </button>

        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Écrivez votre message..."
            className={`w-full p-2 pr-12 max-h-32 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={disabled}
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            {value.length > 0 && (
              <div className={`text-xs ${
                value.length > 900 ? 'text-red-500' : 'text-gray-500'
              }`}>
                {value.length}/1000
              </div>
            )}
            {value.trim() && (
              <button
                onClick={handleSend}
                disabled={(!value.trim() && !hasAttachment) || disabled}
                className={`text-primary hover:text-primary-dark transition-colors ${
                  (!value.trim() && !hasAttachment) || disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;