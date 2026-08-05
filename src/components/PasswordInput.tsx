import { Eye, EyeOff } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  visible: boolean;
  onToggleVisible: () => void;
}

export default function PasswordInput({ value, onChange, visible, onToggleVisible }: Props) {
  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or paste your password"
        autoComplete="off"
        spellCheck={false}
        inputMode="text"
        aria-label="Password input"
        className="w-full rounded-xl border border-white/10 bg-ink-900/80 px-4 py-3.5 pr-12 font-mono text-base text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-neon-cyan/60 focus:shadow-glow-cyan"
      />
      <button
        type="button"
        onClick={onToggleVisible}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:text-neon-cyan focus:text-neon-cyan focus:outline-none"
      >
        {visible ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
