'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Menu() {
    const pathname = usePathname();
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
          href="/book"
          className={`text-lg  hover:text-blue-500 hover:underline ${pathname === '/book' ? 'text-blue-500 underline' : ''}`}
        >
          Reservas
        </Link>
        <Link
          href="/"
          className={`text-lg  hover:text-blue-500 hover:underline ${pathname === '/' ? 'text-blue-500 underline' : ''}`}
        >
          Feed
        </Link>
        <Link
          href="/list"
          className={`text-lg  hover:text-blue-500 hover:underline ${pathname === '/list' ? 'text-blue-500 underline' : ''}`}
        >
          Lista
        </Link>
      </div>
      
      <div className="w-[100px]">
        {/* Espaço reservado para manter o menu centralizado */}
      </div>
    </nav>
  )
}
