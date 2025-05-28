'use client'
import Modal from '@/app/components/Modal'
import { BookingList } from '@/app/types/bookingList';
import React, { useState } from 'react'
import { format } from 'date-fns';
import mock from '@/mocks/bookings.json'

export default function ModalMyBooks({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void }) {
    
  return (
    <>
    <Modal title="Minhas Reservas" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-h-[400px] overflow-y-auto">
            {mock.bookings.map((book) => (
                <div key={book.id} className='flex flex-col '>
                    <div className='flex flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mt-1 mb-1'>
                        <div className='flex flex-col'>
                            <p className='font-medium'>{book.local}</p>
                            <p className='text-gray-600'>{format(new Date(book.date), 'dd/MM/yyyy HH:mm')}</p>
                        </div>
                        {book.status === 'approved' && (
                            <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium'>
                                Aprovado
                            </span>
                        )}
                        {book.status === 'pending' && (
                            <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                Pendente
                            </span>
                        )}
                        {book.status === 'rejected' && (
                            <span className='px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium'>
                                Recusado
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </Modal>
    </>
  )
}
