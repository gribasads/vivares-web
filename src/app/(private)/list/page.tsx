'use client'
import React, { useEffect, useState } from 'react'
import { Table } from '@/app/components/Table'
import { headers } from './constants'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { format } from 'date-fns'
import { bookService } from '@/services/book'
import { ListBooks } from '@/app/types/listBooks'
import { authService } from '@/services/auth'

export default function List() {

  const [books, setBooks] = useState<ListBooks[]>([]);
  const condominiumId = authService.getCondominiumId();

  useEffect(() => {
    if (condominiumId) {
      bookService.getBooksByCondominium(condominiumId).then(setBooks);
    }
  }, []);

  const renderData = books.map((booking) => {
    return (
      <tr key={booking.id}>
        <td className='px-6 py-4 whitespace-nowrap'>{booking.placeName}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{format(new Date(booking.dateHour), 'dd/MM/yyyy - HH:mm')}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{booking.userName}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{booking.userEmail}</td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='flex items-center gap-2'>
            <button 
              onClick={() => bookService.changeBookStatus(booking.id, "approved")}
              disabled={booking.status === "approved"}
              style={{ cursor: booking.status === "approved" ? "not-allowed" : "pointer" }}
              className={`${booking.status === "approved" ? "opacity-50" : "hover:opacity-80"}`}
            >
              <CircleCheckBig color={booking.status === "approved" ? "#ccc" : "green"}/>
            </button>
            <button 
              onClick={() => bookService.changeBookStatus(booking.id, "rejected")}
              disabled={booking.status === "rejected"}
              style={{ cursor: booking.status === "rejected" ? "not-allowed" : "pointer" }}
              className={`${booking.status === "rejected" ? "opacity-50" : "hover:opacity-80"}`}
            >
              <CircleX color={booking.status === "rejected" ? "#ccc" : "red"}/>
            </button>
          </div>
        </td>
      </tr>
    )
  })
  return (
    <div>
        <h1 className='text-2xl font-bold p-4'>Lista de Reservas</h1>
        <Table headers={headers} data={renderData} />
    </div>
  )
}
