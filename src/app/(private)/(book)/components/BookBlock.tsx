'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image';
import ModalBook from './ModalBook';

import { Places } from '@/app/types/places';
import { placesService } from '@/services/places';
import { authService } from '@/services/auth';

export default function BookBlock() {
    const [selectedPlace, setSelectedPlace] = useState<Places | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [places, setPlaces] = useState<Places[]>([]);
    const {getCondominiumId} = authService;

    const handleBookClick = (place: Places) => {
        setSelectedPlace(place);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlace(null);
    };

    const getPlaces = useCallback(async () => {
        const response = await placesService.getPlaces(getCondominiumId() || '');
        setPlaces(response);
    }, [getCondominiumId]);

    useEffect(() => {
        getPlaces();
    }, [getPlaces]);

    return (
        <>
            <div className="flex flex-row gap-5 p-5">
                {places.map((place) => (
                    <div 
                        key={place.id} 
                        className="bg-white p-10 rounded-md shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={() => handleBookClick(place)}
                    >
                        <Image src={place?.image?.[0] || "/logo/logo.png"} alt={place.name} width={100} height={100} />
                        <h1 className="text-xl font-bold">{place.name}</h1>
                        <p className="text-sm text-[#6b7280]">{place.needPayment && "Necessita pagamento"}</p>
                    </div>
                ))}
            </div>

            <ModalBook 
                place={selectedPlace}
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
            />
        </>
    )
}
