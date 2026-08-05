export type StrengthLevel =
  | 'very-weak'
  | 'weak'
  | 'medium'
  | 'strong'
  | 'very-strong';

export interface RequirementResult {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordAnalysis {
  score: number;
  level: StrengthLevel;
  label: string;
  color: string;
  requirements: RequirementResult[];
  suggestions: string[];
  notes: string[];
}

const COMMON_PASSWORDS = new Set([
  'password',
  'password1',
  'password123',
  '123456',
  '12345678',
  '123456789',
  '1234567890',
  'qwerty',
  'qwertyuiop',
  'abc123',
  'abcdef',
  'letmein',
  'welcome',
  'admin',
  'admin123',
  'iloveyou',
  'monkey',
  'dragon',
  'football',
  'baseball',
  'superman',
  'hello',
  'hello123',
  'login',
  'root',
  'toor',
  'passw0rd',
  'p@ssword',
  '111111',
  '000000',
  '666666',
  '654321',
  '1q2w3e4r',
]);

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

function hasSequentialChars(password: string, length: number): boolean {
  if (password.length < length) return false;
  const lower = password.toLowerCase();
  for (let i = 0; i <= lower.length - length; i++) {
    const slice = lower.slice(i, i + length);
    const codes = [...slice].map((c) => c.charCodeAt(0));
    let ascending = true;
    let descending = true;
    for (let j = 1; j < codes.length; j++) {
      if (codes[j] !== codes[j - 1] + 1) ascending = false;
      if (codes[j] !== codes[j - 1] - 1) descending = false;
    }
    if (ascending || descending) return true;
  }
  return false;
}

function hasKeyboardRun(password: string, length: number): boolean {
  const lower = password.toLowerCase();
  for (const row of KEYBOARD_ROWS) {
    for (let i = 0; i <= row.length - length; i++) {
      const fragment = row.slice(i, i + length);
      if (lower.includes(fragment)) return true;
    }
  }
  return false;
}

function isRepeated(password: string): boolean {
  if (password.length < 4) return false;
  const first = password[0];
  return [...password].every((c) => c === first);
}

function getStrengthLevel(score: number): {
  level: StrengthLevel;
  label: string;
  color: string;
} {
  if (score < 20) return { level: 'very-weak', label: 'Very Weak', color: '#f87171' };
  if (score < 40) return { level: 'weak', label: 'Weak', color: '#fb923c' };
  if (score < 60) return { level: 'medium', label: 'Medium', color: '#facc15' };
  if (score < 80) return { level: 'strong', label: 'Strong', color: '#22e378' };
  return { level: 'very-strong', label: 'Very Strong', color: '#22d3ee' };
}

export function analyzePassword(password: string): PasswordAnalysis {
  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isLong = length >= 12;
  const isCommon = COMMON_PASSWORDS.has(password.toLowerCase());
  const hasSequence = hasSequentialChars(password, 4);
  const hasKeyboard = hasKeyboardRun(password, 4);
  const repeated = isRepeated(password);

  const requirements: RequirementResult[] = [
    { id: 'length8', label: 'At least 8 characters', met: length >= 8 },
    { id: 'upper', label: 'Contains an uppercase letter', met: hasUpper },
    { id: 'lower', label: 'Contains a lowercase letter', met: hasLower },
    { id: 'number', label: 'Contains a number', met: hasNumber },
    { id: 'special', label: 'Contains a special character', met: hasSpecial },
    { id: 'length12', label: 'Preferably 12+ characters', met: isLong },
  ];

  let score = 0;

  if (length >= 8) score += 15;
  if (length >= 12) score += 15;
  if (length >= 16) score += 5;
  if (hasLower) score += 10;
  if (hasUpper) score += 12;
  if (hasNumber) score += 12;
  if (hasSpecial) score += 15;

  const charsetSize =
    (hasLower ? 26 : 0) +
    (hasUpper ? 26 : 0) +
    (hasNumber ? 10 : 0) +
    (hasSpecial ? 33 : 0);
  const entropy = length > 0 ? Math.log2(charsetSize) * length : 0;
  if (entropy >= 60) score += 8;
  if (entropy >= 100) score += 8;

  if (length === 0) score = 0;
  if (isCommon) score = Math.min(score, 15);
  if (hasSequence) score -= 15;
  if (hasKeyboard) score -= 15;
  if (repeated) score -= 12;

  score = Math.max(0, Math.min(100, Math.round(score)));

  const { level, label, color } = getStrengthLevel(score);

  const suggestions: string[] = [];
  if (length === 0) {
    suggestions.push('Start typing a password to see how strong it is.');
  }
  if (length > 0 && length < 8) suggestions.push('Add more characters (aim for at least 8).');
  if (length >= 8 && length < 12) suggestions.push('Consider making it 12+ characters for stronger security.');
  if (!hasUpper) suggestions.push('Add an uppercase letter.');
  if (!hasLower) suggestions.push('Add a lowercase letter.');
  if (!hasNumber) suggestions.push('Add numbers.');
  if (!hasSpecial) suggestions.push('Add special characters (e.g. !@#$%).');
  if (isCommon) suggestions.push('Avoid common passwords like "password" or "123456".');
  if (hasSequence) suggestions.push('Avoid predictable sequences like "abcd" or "1234".');
  if (hasKeyboard) suggestions.push('Avoid keyboard patterns like "qwerty" or "asdf".');
  if (repeated) suggestions.push('Avoid repeating the same character.');
  if (score >= 80 && suggestions.length === 0) {
    suggestions.push('Great! Your password follows strong practices. Keep it unique and never reuse it.');
  }

  const notes: string[] = [];
  if (length === 0) {
    notes.push('Enter a password to see a detailed analysis of why it is weak or strong.');
  } else if (isCommon) {
    notes.push('This password appears on well-known leaked password lists, so it can be cracked almost instantly.');
  } else if (repeated) {
    notes.push('A single repeated character offers very little variety, making the password easy to guess.');
  } else if (hasSequence || hasKeyboard) {
    notes.push('Predictable sequences and keyboard runs are among the first patterns attackers try.');
  } else if (score < 40) {
    notes.push('This password lacks length or character variety, so it can be guessed quickly by automated tools.');
  } else if (score < 60) {
    notes.push('This password has some variety but is still vulnerable to sustained brute-force attacks.');
  } else if (score < 80) {
    notes.push('This password is reasonably complex and would resist casual attacks, but could still be improved.');
  } else {
    const variety = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    notes.push(
      `Your password is ${length} characters long and mixes ${variety} character types, giving it high resistance to brute-force and dictionary attacks.`,
    );
  }

  return { score, level, label, color, requirements, suggestions, notes };
}

export interface GeneratorOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  special: boolean;
}

const CHAR_SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  number: '0123456789',
  special: '!@#$%^&*()-_=+[]{};:,.?/~',
};

export function generatePassword(opts: GeneratorOptions): string {
  const enabled: string[] = [];
  if (opts.uppercase) enabled.push(CHAR_SETS.upper);
  if (opts.lowercase) enabled.push(CHAR_SETS.lower);
  if (opts.numbers) enabled.push(CHAR_SETS.number);
  if (opts.special) enabled.push(CHAR_SETS.special);

  if (enabled.length === 0) return '';

  const pool = enabled.join('');
  const result: string[] = [];

  for (const set of enabled) {
    result.push(set[Math.floor(cryptoRandom() * set.length)]);
  }

  for (let i = result.length; i < opts.length; i++) {
    result.push(pool[Math.floor(cryptoRandom() * pool.length)]);
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(cryptoRandom() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.slice(0, opts.length).join('');
}

function cryptoRandom(): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / 4294967296;
}
