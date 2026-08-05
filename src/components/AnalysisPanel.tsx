import { ShieldCheck, ShieldAlert, Lightbulb } from 'lucide-react';
import type { PasswordAnalysis } from '@/lib/password';

export default function AnalysisPanel({ analysis }: { analysis: PasswordAnalysis }) {
  const strong = analysis.score >= 60;
  const Icon = strong ? ShieldCheck : ShieldAlert;
  const accent = strong ? 'text-neon-green' : 'text-amber-400';

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 shrink-0 ${accent}`} size={22} />
        <div className="space-y-1.5">
          <h4 className="font-semibold text-slate-100">Password Analysis</h4>
          <p className="text-sm leading-relaxed text-slate-300">{analysis.notes[0]}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-neon-cyan/15 bg-neon-cyan/5 p-3.5">
        <Lightbulb className="mt-0.5 shrink-0 text-neon-cyan" size={20} />
        <div className="space-y-1.5">
          <h4 className="font-semibold text-slate-100">Suggestions</h4>
          <ul className="space-y-1 text-sm leading-relaxed text-slate-300">
            {analysis.suggestions.length === 0 ? (
              <li>No suggestions — your password follows strong practices.</li>
            ) : (
              analysis.suggestions.map((s, i) => <li key={i}>• {s}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
