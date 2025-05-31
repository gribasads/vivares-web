import React from 'react'
import { X } from 'lucide-react'

interface ModalProps {
    title: string;
    isOpen?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

export default function Modal({ title, isOpen, onClose,  children }: ModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative my-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
