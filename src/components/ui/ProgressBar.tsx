import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  color?: string;
}

export default function ProgressBar({ progress, color = 'bg-blue-500' }: ProgressBarProps) {
  return (
    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  );
}