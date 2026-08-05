import { ShieldCheck } from 'lucide-react';

const TIPS = [
  {
    title: 'Never reuse important passwords',
    body: 'Use a different password for each account. If one is leaked, the others stay safe.',
  },
  {
    title: 'Avoid names, birthdays and phone numbers',
    body: 'Personal details are easy to find on social media and are the first things attackers try.',
  },
  {
    title: 'Use unique passwords',
    body: 'A unique password for every site prevents one breach from compromising all your accounts.',
  },
  {
    title: 'Prefer long passwords or passphrases',
    body: 'Length beats complexity. A 4-word passphrase is often stronger than a short tricky password.',
  },
  {
    title: 'Enable two-factor authentication',
    body: 'Add a second layer of protection so a stolen password alone is not enough to log in.',
  },
];

export default function SecurityTips() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {TIPS.map((tip) => (
        <div
          key={tip.title}
          className="rounded-xl border border-white/5 bg-ink-800/60 p-4 transition hover:border-neon-cyan/30"
        >
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck size={18} className="shrink-0 text-neon-cyan" />
            <h4 className="font-semibold text-slate-100">{tip.title}</h4>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{tip.body}</p>
        </div>
      ))}
    </div>
  );
}
