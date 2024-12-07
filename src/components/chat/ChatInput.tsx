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
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value changing to:', e.target.value);
    onChange(e.target.value);
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
    <div className="p-2">
      <div className="flex items-center gap-2">
        <div 
          role="button"
          tabIndex={0}
          onClick={handleAttachmentClick}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleAttachmentClick(e as any);
            }
          }}
          className={`shrink-0 p-2 rounded-full transition-colors cursor-pointer ${
            hasAttachment
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-500'
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <FontAwesomeIcon icon={faPaperclip} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Écrivez votre message..."
          className={`flex-1 min-w-0 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'
          }`}
          disabled={disabled}
          autoComplete="off"
          style={{
            WebkitAppearance: 'none'
          }}
        />

        {hasContent && (
          <div
            role="button"
            tabIndex={0}
            onClick={handleSend}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSend(e as any);
              }
            }}
            className="shrink-0 p-2 rounded-full transition-colors bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;