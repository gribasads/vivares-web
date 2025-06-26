import React from 'react'
import { Table } from '@/app/components/Table'
import { headers } from './constants'
import bookingsData from '@/mocks/bookings.json'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { format } from 'date-fns'

export default function List() {

  const renderData = bookingsData.bookings.map((booking) => {
    return (
      <tr key={booking.id}>
        <td className='px-6 py-4 whitespace-nowrap'>{booking.local}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{format(new Date(booking.date), 'dd/MM/yyyy - HH:mm')}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{booking.name}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{booking.address}</td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='flex items-center gap-2'>
            <button>
              <CircleCheckBig color='green'/>
            </button>
            <button>
              <CircleX color='red'/>
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
