import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";   
    variant?: "login"| "primary" | "secondary";
}
export default function Button({ children, className, onClick, type, variant }: ButtonProps) {
  return (
    <>
        {
            variant === "login" && (
            <button className={`w-full p-5 bg-[linear-gradient(135deg,_#2b4c7e,_#1a1a2e)] text-white rounded-xl text-lg font-semibold tracking-wider cursor-pointer transition-all duration-400 relative overflow-hidden hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(43,76,126,0.25)] group`} onClick={onClick} type={type}>{children}</button>
        )
    }
    </>
  )
}
