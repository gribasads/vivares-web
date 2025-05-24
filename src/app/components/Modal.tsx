import React, { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

interface ModalProps {
    title: string;
    isOpen?: boolean;
    id?: string;
    onClose?: () => void;
}

export default function Modal({ title, isOpen, onClose }: ModalProps) {
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
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

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
        </div>
      </div>
    </div>
  )
}
