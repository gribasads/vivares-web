import React, { useRef, useState } from 'react';

interface VerificationCodeInputProps {
  onComplete: (code: string) => void;
}

export default function VerificationCodeInput({ onComplete }: VerificationCodeInputProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(digit => digit !== '')) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array(6).fill(0).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={code[index]}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-xl border-2 border-[#e8eef9] rounded-xl bg-[#f8fafd] focus:outline-none focus:border-[#2b4c7e] focus:bg-white focus:shadow-[0_0_0_4px_rgba(43,76,126,0.1)]"
        />
      ))}
    </div>
  );
} 