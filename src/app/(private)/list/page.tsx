import React from 'react'

export default function List() {
  return (
    <div>
        <h1>Lista de Reservas</h1>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h2>Reserva 1</h2>
                <p>Data: 10/01/2024</p>
                <p>Hora: 10:00</p>
            </div>
        </div>
    </div>
  )
}
