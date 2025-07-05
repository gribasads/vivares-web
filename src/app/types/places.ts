export interface Places {
    _id: string;
    id: string;
    name: string;
    needPayment: boolean;
    image: string[];
    condominium: string;
    
    // Novos campos para controle de reservas
    reservationType: 'single' | 'multiple';
    maxCapacity: number;
    timeSlot: number;
    
    // Horários de funcionamento
    openingTime: string;
    closingTime: string;
    
    // Configurações de reserva
    reservationSettings: {
        allowOverlap: boolean;
        maxConcurrentBookings: number;
        timeBuffer: number;
    };
}