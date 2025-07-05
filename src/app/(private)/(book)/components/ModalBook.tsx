import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, Check, X, AlertTriangle } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Modal from '@/app/components/Modal';
import { bookService } from '@/services/book';
import { authService } from '@/services/auth';
import { Places } from '@/app/types/places';

interface ModalProps {
    place: Places | null;
    isOpen?: boolean;
    onClose?: () => void;
}

export default function ModalBook({ place, isOpen, onClose }: ModalProps) {
  const [guests, setGuests] = useState<string[]>(['']);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reason, setReason] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Função para limpar todos os dados do modal
  const clearModalData = () => {
    setGuests(['']);
    setSelectedDate(new Date());
    setReason('');
    setIsAvailable(null);
    setIsCheckingAvailability(false);
    setIsBooking(false);
    setShowSuccess(false);
  };

  // Limpar dados quando o modal fechar
  useEffect(() => {
    if (!isOpen) {
      clearModalData();
    }
  }, [isOpen]);

  // Função para gerar horários disponíveis baseado no horário de funcionamento
  const getAvailableTimeSlots = () => {
    if (!place) return [];

    const slots = [];
    const openingTime = new Date();
    const closingTime = new Date();
    
    // Parse opening time (formato "HH:MM")
    const [openingHour, openingMinute] = place.openingTime.split(':').map(Number);
    openingTime.setHours(openingHour, openingMinute, 0, 0);
    
    // Parse closing time (formato "HH:MM") - 2 horas antes do fechamento
    const [closingHour, closingMinute] = place.closingTime.split(':').map(Number);
    closingTime.setHours(closingHour - 2, closingMinute, 0, 0);
    
    // Gerar slots de 15 em 15 minutos
    const currentTime = new Date(openingTime);
    while (currentTime <= closingTime) {
      slots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }
    
    return slots;
  };

  // Verificar disponibilidade quando a data/hora mudar
  useEffect(() => {
    if (place && selectedDate) {
      checkAvailability();
    }
  }, [place, selectedDate]);

  const checkAvailability = async () => {
    if (!place) return;
    
    setIsCheckingAvailability(true);
    try {
      const response = await bookService.checkAvailability(
        place._id, 
        selectedDate.toISOString()
      );
      setIsAvailable(response.available);
    } catch (error) {
      console.error('Erro ao verificar disponibilidade:', error);
      setIsAvailable(false);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

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

  const handleBook = async () => {
    if (!place || !isAvailable || isBooking) return;

    setIsBooking(true);
    try {
      const booking = {
        placeId: place._id,
        userId: authService.getUserId() || '',
        dateHour: selectedDate,
        guests: guests,
        reason: reason,
      }
      
      await bookService.book(booking);
      console.log('Reserva criada com sucesso!');
      
      // Mostrar animação de sucesso
      setShowSuccess(true);
      
      // Fechar modal após 4 segundos
      setTimeout(() => {
        onClose?.();
      }, 4000);
      
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
    } finally {
      setIsBooking(false);
    }
  }

  const handleCloseModal = () => {
    clearModalData();
    onClose?.();
  };

  if (!isOpen || !place) return null;

  const availableTimeSlots = getAvailableTimeSlots();
  const isFormValid = isAvailable && reason.trim().length > 0 && !isBooking;

  return (
    <Modal title={place.name} isOpen={isOpen} onClose={handleCloseModal}>
        {/* Overlay de sucesso */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
              {place.needPayment ? (
                <>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Reserva Pendente</h3>
                  <p className="text-gray-600 text-center max-w-sm">
                    Sua reserva foi registrada, mas só será confirmada após o pagamento na administração.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Reserva Concluída!</h3>
                  <p className="text-gray-600 text-center">
                    Sua reserva foi realizada com sucesso.
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {place.needPayment && (
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
                onChange={(date: Date | null) => setSelectedDate(date || new Date())}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholderText="Selecione a data e hora"
                timeCaption="Hora"
                includeTimes={availableTimeSlots}
                minTime={availableTimeSlots[0]}
                maxTime={availableTimeSlots[availableTimeSlots.length - 1]}
                disabled={isBooking}
              />
              <p className="text-xs text-gray-500 mt-1">
                Horário de funcionamento: {place.openingTime} - {place.closingTime}
              </p>
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
                      disabled={isBooking}
                    />
                    {index === 0 ? (
                      <button
                        onClick={addGuest}
                        disabled={guests.length >= 6 || isBooking}
                        className="p-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => removeGuest(index)}
                        className="p-2 bg-red-500 text-white rounded-md disabled:opacity-50"
                        disabled={isBooking}
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status de disponibilidade */}
          {isCheckingAvailability && (
            <div className="text-blue-600 text-sm">
              Verificando disponibilidade...
            </div>
          )}
          
          {isAvailable === false && !isCheckingAvailability && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              ⚠️ Este horário não está disponível para reserva. Por favor, escolha outro horário.
            </div>
          )}

          <div className="h-24">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo da Reserva <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full h-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Digite o motivo da reserva..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isBooking}
            />
            {reason.trim().length === 0 && (
              <p className="text-xs text-red-500 mt-1">
                O motivo da reserva é obrigatório
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button 
              className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                isFormValid
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`} 
              onClick={handleBook}
              disabled={!isFormValid}
            >
              {isBooking ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Realizando reserva...
                </>
              ) : (
                'Reservar'
              )}
            </button>
          </div>
        </div>
    </Modal>
  )
}
