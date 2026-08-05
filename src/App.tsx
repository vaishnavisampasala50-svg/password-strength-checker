import { useMemo, useState } from 'react';
import { ShieldCheck, Lock, KeyRound, Info, Cpu, ShieldAlert } from 'lucide-react';
import { analyzePassword } from '@/lib/password';
import PasswordInput from '@/components/PasswordInput';
import StrengthBar from '@/components/StrengthBar';
import RequirementList from '@/components/RequirementList';
import AnalysisPanel from '@/components/AnalysisPanel';
import PasswordGenerator from '@/components/PasswordGenerator';
import SecurityTips from '@/components/SecurityTips';

function App() {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const analysis = useMemo(() => analyzePassword(password), [password]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 cyber-grid animate-grid-pan opacity-60" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-neon-green/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-neon-cyan/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Header */}
        <header className="animate-fade-up text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-4 py-1.5 text-xs font-medium text-neon-green">
            <ShieldCheck size={14} />
            Cyber Security Mini Project
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Password <span className="text-neon-green text-glow-green">Strength</span> Checker
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Check how strong your password is, learn what makes it weak, and generate a secure
            one — all instantly, right in your browser.
          </p>
        </header>

        {/* Privacy notice */}
        <div className="animate-fade-up mt-6 flex items-center justify-center" style={{ animationDelay: '60ms' }}>
          <div className="inline-flex items-center gap-2 rounded-xl border border-neon-cyan/20 bg-ink-850/80 px-4 py-2.5 text-center text-xs text-slate-300 sm:text-sm">
            <Lock size={16} className="shrink-0 text-neon-cyan" />
            Your password is analyzed locally in your browser and is never stored or transmitted.
          </div>
        </div>

        {/* Checker card */}
        <section
          className="animate-fade-up card-surface mt-8 p-5 sm:p-7"
          style={{ animationDelay: '120ms' }}
          aria-label="Password strength checker"
        >
          <div className="mb-4 flex items-center gap-2">
            <KeyRound size={20} className="text-neon-cyan" />
            <h2 className="text-lg font-semibold text-slate-100">Check your password</h2>
          </div>

          <PasswordInput
            value={password}
            onChange={setPassword}
            visible={visible}
            onToggleVisible={() => setVisible((v) => !v)}
          />

          <div className="mt-5">
            <StrengthBar score={analysis.score} color={analysis.color} label={password ? analysis.label : '—'} />
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Requirements
            </h3>
            <RequirementList requirements={analysis.requirements} />
          </div>

          <div className="mt-6 border-t border-white/5 pt-6">
            <AnalysisPanel analysis={analysis} />
          </div>
        </section>

        {/* Generator card */}
        <section
          className="animate-fade-up card-surface mt-6 p-5 sm:p-7"
          style={{ animationDelay: '160ms' }}
          aria-label="Strong password generator"
        >
          <div className="mb-4 flex items-center gap-2">
            <Cpu size={20} className="text-neon-green" />
            <h2 className="text-lg font-semibold text-slate-100">Generate a strong password</h2>
          </div>
          <p className="mb-5 text-sm text-slate-400">
            Pick your character types and length, then generate a secure random password.
          </p>
          <PasswordGenerator onGenerate={setPassword} />
          {password && (
            <p className="mt-4 text-xs text-slate-500">
              Generated passwords are loaded into the checker above so you can review their strength.
            </p>
          )}
        </section>

        {/* Tips card */}
        <section
          className="animate-fade-up card-surface mt-6 p-5 sm:p-7"
          style={{ animationDelay: '200ms' }}
          aria-label="Password security tips"
        >
          <div className="mb-4 flex items-center gap-2">
            <ShieldAlert size={20} className="text-neon-cyan" />
            <h2 className="text-lg font-semibold text-slate-100">Password security tips</h2>
          </div>
          <SecurityTips />
        </section>

        {/* How it works */}
        <section
          className="animate-fade-up mt-6 flex items-start gap-3 rounded-2xl border border-white/5 bg-ink-850/60 p-5 text-sm leading-relaxed text-slate-400"
          style={{ animationDelay: '240ms' }}
        >
          <Info size={18} className="mt-0.5 shrink-0 text-neon-cyan" />
          <p>
            This tool runs entirely in your browser. Nothing you type is sent to a server, stored,
            or logged. The strength score is based on length, character variety, estimated
            entropy, and checks against common passwords and predictable patterns.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-white/5 pt-6 text-center text-sm text-slate-500">
          <p>Password Strength Checker | Cyber Security Mini Project</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
