'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { authService } from '@/services/auth';
import { Loader2 } from 'lucide-react';

export default function Menu() {
    const pathname = usePathname();
    const [isAdmin, setIsAdmin] = useState(false);
    const [toggleLoading, setToggleLoading] = useState(false);

    const checkAdminStatus = async () => {
        try {
            const adminStatus = authService.isAdmin();
            setIsAdmin(adminStatus);
        } catch (error) {
            console.error('Erro ao verificar status de admin:', error);
        }
    };

    useEffect(() => {
        checkAdminStatus();
    }, []);

    const handleToggleAdmin = async () => {
        const userId = authService.getUserId();
        if (!userId) return;
        
        try {
            setToggleLoading(true);
            const result = await authService.toggleAdmin(userId);
            
            if (result.error) {
                console.error('Erro ao alterar status de admin:', result.error);
                return;
            }
            
            // Atualizar o estado local
            setIsAdmin(result.isAdmin);
            
        } catch (error) {
            console.error('Erro ao alterar status de admin:', error);
        } finally {
            setToggleLoading(false);
        }
    };

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Image 
          src="/logos/logo.png" 
          alt="Logo" 
          width={32} 
          height={32} 
          className="h-8 w-auto"
        />
      </div>
      
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className={`text-lg  hover:text-blue-500 hover:underline ${pathname === '/' ? 'text-blue-500 underline' : ''}`}
        >
          Reservas
        </Link>
        {isAdmin && (
          <Link
            href="/list"
            className={`text-lg  hover:text-blue-500 hover:underline ${pathname === '/list' ? 'text-blue-500 underline' : ''}`}
          >
            Lista
          </Link>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggleAdmin}
          disabled={toggleLoading}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {toggleLoading ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            isAdmin ? 'Mudar para Usuário' : 'Mudar para Admin'
          )}
        </button>
      </div>
    </nav>
  )
}
