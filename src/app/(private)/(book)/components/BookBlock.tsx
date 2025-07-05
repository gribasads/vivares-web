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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
                {places.map((place) => (
                    <div 
                        key={place.id} 
                        className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                        onClick={() => handleBookClick(place)}
                    >
                        <div className="relative w-full h-48">
                            <Image 
                                src={place?.image?.[0] || "/logo/logo.png"} 
                                alt={place.name} 
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="p-4">
                            <h1 className="text-lg font-bold text-gray-800 mb-2">{place.name}</h1>
                            {place.needPayment && (
                                <p className="text-sm text-orange-600 font-medium">
                                    💳 Necessita pagamento
                                </p>
                            )}
                        </div>
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
