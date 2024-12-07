interface CoachStatusProps {
  isOnline: boolean;
}

export default function CoachStatus({ isOnline }: CoachStatusProps) {
  return (
    <span
      className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
        isOnline ? 'bg-green-500' : 'bg-gray-400'
      }`}
      title={isOnline ? 'En ligne' : 'Hors ligne'}
    />
  );
}