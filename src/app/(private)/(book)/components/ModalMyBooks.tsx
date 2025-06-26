'use client'
import Modal from '@/app/components/Modal'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { bookService } from '@/services/book';
import { authService } from '@/services/auth';

interface BookResponse {
    placeName: string;
    dateHour: string;
    reason: string;
    guests: string[];
    status: "pending" | "approved" | "rejected";
}

export default function ModalMyBooks({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void }) {
    const [books, setBooks] = useState<BookResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const userId = authService.getUserId();
            if (userId) {
                const userBooks = await bookService.getBooksByUser(userId);
                setBooks(userBooks);
            }
        } catch (error) {
            console.error('Erro ao buscar reservas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            fetchBooks();
        }
    }, [isModalOpen]);

    const toggleExpanded = (index: number) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedItems(newExpanded);
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'approved':
                return 'Aprovado';
            case 'pending':
                return 'Pendente';
            case 'rejected':
                return 'Recusado';
            default:
                return status;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    
  return (
    <>
    <Modal title="Minhas Reservas" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <p className="text-gray-600">Carregando...</p>
                </div>
            ) : books.length === 0 ? (
                <div className="flex justify-center items-center py-8">
                    <p className="text-gray-600">Nenhuma reserva encontrada</p>
                </div>
            ) : (
                books.map((book, index) => (
                    <div key={index} className='flex flex-col'>
                        <div className='flex flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mt-1 mb-1 cursor-pointer hover:bg-gray-200 transition-colors'
                             onClick={() => toggleExpanded(index)}>
                            <div className='flex flex-col flex-1'>
                                <p className='font-medium'>{book.placeName}</p>
                                <p className='text-gray-600'>{format(new Date(book.dateHour), 'dd/MM/yyyy HH:mm')}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(book.status)}`}>
                                    {getStatusText(book.status)}
                                </span>
                                <svg 
                                    className={`w-5 h-5 transition-transform ${expandedItems.has(index) ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        
                        {expandedItems.has(index) && (
                            <div className='bg-white border border-gray-200 rounded-lg p-4 mb-1 shadow-sm'>
                                <div className='space-y-3'>
                                    <div>
                                        <h4 className='font-medium text-gray-900 mb-1'>Motivo:</h4>
                                        <p className='text-gray-700'>{book.reason}</p>
                                    </div>
                                    <div>
                                        <h4 className='font-medium text-gray-900 mb-1'>Convidados:</h4>
                                        <div className='flex flex-wrap gap-2'>
                                            {book.guests.map((guest, guestIndex) => (
                                                <span 
                                                    key={guestIndex}
                                                    className='px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
                                                >
                                                    {guest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    </Modal>
    </>
  )
}
