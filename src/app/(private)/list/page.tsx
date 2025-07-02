'use client'
import React, { useEffect, useState } from 'react'
import { Table } from '@/app/components/Table'
import { headers } from './constants'
import { CircleCheckBig, CircleX, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { bookService } from '@/services/book'
import { ListBooks } from '@/app/types/listBooks'
import { authService } from '@/services/auth'
import { useRouter } from 'next/navigation'

export default function List() {
  const [books, setBooks] = useState<ListBooks[]>([]);
  const [loading, setLoading] = useState(true);
  const [changingStatus, setChangingStatus] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const condominiumId = authService.getCondominiumId();
  const router = useRouter();

  const fetchBooks = async () => {
    if (condominiumId) {
      setLoading(true);
      try {
        const data = await bookService.getBooksByCondominium(condominiumId);
        setBooks(data);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const checkAdminStatus = async () => {
    try {
      const adminStatus = authService.isAdmin();
      setIsAdmin(adminStatus);
      
      if (!adminStatus) {
        router.push('/');
        return;
      }
    } catch (error) {
      console.error('Erro ao verificar status de admin:', error);
      router.push('/');
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchBooks();
    }
  }, [isAdmin]);

  // Monitorar mudanças no status de admin e redirecionar se necessário
  useEffect(() => {
    const checkAdminAndRedirect = () => {
      const currentAdminStatus = authService.isAdmin();
      if (!currentAdminStatus) {
        router.push('/');
      }
    };

    // Verificar a cada 2 segundos se o status mudou
    const interval = setInterval(checkAdminAndRedirect, 2000);

    return () => clearInterval(interval);
  }, [router]);

  const handleStatusChange = async (bookId: string, status: "approved" | "rejected") => {
    try {
      setChangingStatus(bookId);
      await bookService.changeBookStatus(bookId, status);
      await fetchBooks();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    } finally {
      setChangingStatus(null);
    }
  };

  const renderData = books.map((booking) => {
    const isChangingStatus = changingStatus === booking.id;

    return (
      <tr key={booking.id}>
        <td className='px-6 py-4 whitespace-nowrap'>{booking.placeName}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{format(new Date(booking.dateHour), 'dd/MM/yyyy - HH:mm')}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{booking.userName}</td>
        <td className='px-6 py-4 whitespace-nowrap'>{booking.userEmail}</td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='flex items-center gap-2'>
            {isChangingStatus ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <button 
                  onClick={() => handleStatusChange(booking.id, "approved")}
                  disabled={booking.status === "approved"}
                  style={{ cursor: booking.status === "approved" ? "not-allowed" : "pointer" }}
                  className={`${booking.status === "approved" ? "opacity-50" : "hover:opacity-80"}`}
                >
                  <CircleCheckBig color={booking.status === "approved" ? "#ccc" : "green"}/>
                </button>
                <button 
                  onClick={() => handleStatusChange(booking.id, "rejected")}
                  disabled={booking.status === "rejected"}
                  style={{ cursor: booking.status === "rejected" ? "not-allowed" : "pointer" }}
                  className={`${booking.status === "rejected" ? "opacity-50" : "hover:opacity-80"}`}
                >
                  <CircleX color={booking.status === "rejected" ? "#ccc" : "red"}/>
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    )
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div>
        <h1 className='text-2xl font-bold p-4'>Lista de Reservas</h1>
        <Table headers={headers} data={renderData} />
    </div>
  )
}
