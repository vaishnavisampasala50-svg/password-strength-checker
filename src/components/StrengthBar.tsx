interface Props {
  score: number;
  color: string;
  label: string;
}

export default function StrengthBar({ score, color, label }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Strength</span>
        <span className="font-semibold tracking-wide" style={{ color }}>
          {label}
        </span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-ink-700/80">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 12px ${color}99`,
          }}
        />
        {score > 0 && (
          <div
            className="absolute inset-0 animate-bar-shimmer opacity-40"
            style={{
              width: `${score}%`,
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              backgroundSize: '200% 100%',
            }}
          />
        )}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Score</span>
        <span className="font-mono font-semibold text-slate-200">{score}/100</span>
      </div>
    </div>
  );
}
