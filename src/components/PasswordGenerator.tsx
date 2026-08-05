import { Copy, RefreshCw, Trash2, Check } from 'lucide-react';
import { useState } from 'react';
import { generatePassword, type GeneratorOptions } from '@/lib/password';

interface Props {
  onGenerate: (pw: string) => void;
}

const DEFAULT_OPTS: GeneratorOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  special: true,
};

export default function PasswordGenerator({ onGenerate }: Props) {
  const [opts, setOpts] = useState<GeneratorOptions>(DEFAULT_OPTS);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const update = (patch: Partial<GeneratorOptions>) => {
    setOpts((prev) => {
      const next = { ...prev, ...patch };
      if (!next.uppercase && !next.lowercase && !next.numbers && !next.special) {
        setError('Select at least one character type.');
      } else {
        setError('');
      }
      return next;
    });
  };

  const handleGenerate = () => {
    if (!opts.uppercase && !opts.lowercase && !opts.numbers && !opts.special) {
      setError('Select at least one character type.');
      return;
    }
    const pw = generatePassword(opts);
    setOutput(pw);
    onGenerate(pw);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleClear = () => {
    setOutput('');
    setCopied(false);
    setError('');
  };

  const toggleClass =
    'relative h-6 w-11 rounded-full transition-colors peer-checked:bg-neon-green peer-focus-visible:ring-2 peer-focus-visible:ring-neon-cyan/60';

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="length" className="text-sm text-slate-300">
            Password length
          </label>
          <span className="font-mono font-semibold text-neon-cyan">{opts.length}</span>
        </div>
        <input
          id="length"
          type="range"
          min={6}
          max={32}
          value={opts.length}
          onChange={(e) => update({ length: Number(e.target.value) })}
          className="w-full accent-neon-cyan"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>6</span>
          <span>32</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { id: 'uppercase', label: 'A-Z' },
          { id: 'lowercase', label: 'a-z' },
          { id: 'numbers', label: '0-9' },
          { id: 'special', label: '!@#$' },
        ].map((opt) => {
          const checked = opts[opt.id as keyof GeneratorOptions] as boolean;
          return (
            <label
              key={opt.id}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-ink-800/60 px-3 py-2.5 text-sm text-slate-300 transition hover:border-neon-cyan/40 has-[:checked]:border-neon-green/50 has-[:checked]:bg-neon-green/5 has-[:checked]:text-neon-green"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => update({ [opt.id]: !checked } as Partial<GeneratorOptions>)}
                className="peer sr-only"
              />
              <span
                className={toggleClass}
                aria-hidden
                style={{ background: checked ? undefined : 'rgba(255,255,255,0.08)' }}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    checked ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </span>
              <span className="font-mono">{opt.label}</span>
            </label>
          );
        })}
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          className="inline-flex items-center gap-2 rounded-xl bg-neon-green px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:shadow-glow-green"
        >
          <RefreshCw size={16} />
          Generate Password
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-ink-700/60 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-neon-cyan/50 hover:text-neon-cyan disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? <Check size={16} className="text-neon-green" /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-ink-700/60 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-rose-400/50 hover:text-rose-400"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      {output && (
        <div className="animate-fade-up rounded-xl border border-neon-green/20 bg-ink-900/80 p-4">
          <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Generated password</p>
          <p className="break-all font-mono text-base text-neon-green text-glow-green">
            {output}
          </p>
        </div>
      )}
    </div>
  );
}
