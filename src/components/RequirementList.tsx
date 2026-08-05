import { Check, X } from 'lucide-react';
import type { RequirementResult } from '@/lib/password';

export default function RequirementList({ requirements }: { requirements: RequirementResult[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {requirements.map((req) => (
        <li
          key={req.id}
          className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition ${
            req.met
              ? 'border-neon-green/30 bg-neon-green/5 text-neon-green'
              : 'border-white/5 bg-ink-800/60 text-slate-400'
          }`}
        >
          {req.met ? (
            <Check size={16} className="shrink-0" />
          ) : (
            <X size={16} className="shrink-0 text-rose-400/70" />
          )}
          <span>{req.label}</span>
        </li>
      ))}
    </ul>
  );
}
