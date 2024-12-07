import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faList } from '@fortawesome/free-solid-svg-icons';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-md transition-colors ${
          view === 'grid'
            ? 'bg-gray-700 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        title="Vue grille"
      >
        <FontAwesomeIcon icon={faGrip} />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-md transition-colors ${
          view === 'list'
            ? 'bg-gray-700 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        title="Vue liste"
      >
        <FontAwesomeIcon icon={faList} />
      </button>
    </div>
  );
}