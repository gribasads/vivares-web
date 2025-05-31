'use client'
import React, { useState } from 'react'
import books from "@/mocks/books.json";
import Image from 'next/image';
import ModalBook from './ModalBook';

export default function BookBlock() {
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [needPaid, setNeedPaid] = useState(false);


    const handleBookClick = (bookName: string, needPaid: boolean) => {
        setSelectedBook(bookName);
        setIsModalOpen(true);
        setNeedPaid(needPaid);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };
    
    return (
        <>
            <div className="flex flex-row gap-5 p-5">
                {books.map((book) => (
                    <div 
                        key={book.id} 
                        className="bg-white p-10 rounded-md shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={() => handleBookClick(book.name, book.needPayment)}
                    >
                        <Image src="/logo/logo.png" alt={book.name} width={100} height={100} />
                        <h1 className="text-xl font-bold">{book.name}</h1>
                        <p className="text-sm text-[#6b7280]">{book.needPayment && "Necessita pagamento"}</p>
                    </div>
                ))}
            </div>

            <ModalBook 
                title={selectedBook || ''} 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                needPaid={needPaid}
            />
        </>
    )
}
