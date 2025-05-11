import React from 'react'

interface InputProps {
    placeholder: string;
    type: string;
    label: string;
    id: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, type, label, id, value, onChange }: InputProps) {
  return (
    <div className="mb-8 relative">
      <label 
        htmlFor={id}
        className="block mb-3 text-[#2b4c7e] font-semibold text-sm tracking-wide"
      >
        {label}
      </label>
      <input 
        id={id}
        className="w-full p-5 border-2 border-[#e8eef9] rounded-xl text-lg transition-all duration-400 bg-[#f8fafd] focus:outline-none focus:border-[#2b4c7e] focus:bg-white focus:shadow-[0_0_0_4px_rgba(43,76,126,0.1)]" 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
