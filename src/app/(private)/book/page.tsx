'use client'
import BookBlock from "@/app/(private)/book/components/BookBlock";
import Button from "@/app/components/button";
import { useState } from "react";
import ModalMyBooks from "./components/ModalMyBooks";


export default function Book() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <main >
        <div className="flex justify-end p-4">
        <Button variant="primary" className="w-48 p-4" onClick={() => setIsModalOpen(true)}>
          <p>
           Minhas Reservas
          </p>
        </Button>
        </div>
        <div className="flex justify-start pl-4">
          <BookBlock />
        </div>
        <ModalMyBooks 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen}
        />
      </main>
    );
  }
  