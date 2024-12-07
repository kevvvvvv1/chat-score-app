interface CoachInfoProps {
  name: string;
  age: number;
  bio: string;
  style: string;
}

export default function CoachInfo({ name, age, bio, style }: CoachInfoProps) {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <span className="text-gray-600">{age} ans</span>
      </div>
      <p className="text-gray-600 mb-2">{bio}</p>
      <p className="text-sm text-gray-500 mb-4">Style: {style}</p>
    </div>
  );
}