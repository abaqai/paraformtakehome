

interface MatchScoreBadgeProps {
  score: 'high' | 'medium' | 'low';
  className?: string;
}

export default function MatchScoreBadge({ score, className = '' }: MatchScoreBadgeProps) {
  const getScoreConfig = (score: 'high' | 'medium' | 'low') => {
    switch (score) {
      case 'high':
        return {
          label: 'High Match',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200'
        };
      case 'medium':
        return {
          label: 'Medium Match',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200'
        };
      case 'low':
        return {
          label: 'Low Match',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200'
        };
    }
  };

  const config = getScoreConfig(score);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      {config.label}
    </span>
  );
} 