import { Coach } from '../../types/coach';
import CoachCard from './CoachCard';

interface CoachListProps {
  title: string;
  coaches: Coach[];
  onChatClick: (coachId: string) => void;
  titleColor?: string;
}

export default function CoachList({ 
  title, 
  coaches, 
  onChatClick, 
  titleColor = 'text-gray-600' 
}: CoachListProps) {
  return (
    <div className="mb-8">
      <h3 className={`text-xl font-semibold mb-4 ${titleColor}`}>
        {title} ({coaches.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coaches.map(coach => (
          <CoachCard
            key={coach.id}
            coach={coach}
            onProfileClick={() => onChatClick(coach.id)}
          />
        ))}
      </div>
    </div>
  );
}