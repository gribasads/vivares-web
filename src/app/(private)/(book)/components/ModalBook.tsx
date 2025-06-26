import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Modal from '@/app/components/Modal';

interface ModalProps {
    title: string;
    isOpen?: boolean;
    id?: string;
    needPaid?: boolean;
    onClose?: () => void;
}

export default function ModalBook({ title, isOpen, onClose, needPaid }: ModalProps) {
  const [guests, setGuests] = useState<string[]>(['']);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const addGuest = () => {
    if (guests.length < 6) {
      setGuests([...guests, '']);
    }
  };

  const removeGuest = (index: number) => {
    if (index !== 0) {
      const newGuests = guests.filter((_, i) => i !== index);
      setGuests(newGuests);
    }
  };

  const updateGuest = (index: number, value: string) => {
    const newGuests = [...guests];
    newGuests[index] = value;
    setGuests(newGuests);
  };

  if (!isOpen) return null;

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
        {needPaid && (
          <p className="text-sm text-gray-500 mt-1 mb-4 flex items-center gap-1">
            *Necessita pagamento
            <span className="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg">
                A reserva só será confirmada após o pagamento da reserva na administração
              </span>
            </span>
          </p>
        )}

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data e Hora
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholderText="Selecione a data e hora"
                timeCaption="Hora"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Convidados
              </label>
              <div className="max-h-32 overflow-y-auto">
                {guests.map((guest, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={guest}
                      onChange={(e) => updateGuest(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome do convidado"
                    />
                    {index === 0 ? (
                      <button
                        onClick={addGuest}
                        disabled={guests.length >= 6}
                        className="p-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => removeGuest(index)}
                        className="p-2 bg-red-500 text-white rounded-md"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-24">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo da Reserva
            </label>
            <textarea
              className="w-full h-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Digite o motivo da reserva..."
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Reservar
            </button>
          </div>
        </div>
    </Modal>
  )
}
