"use client";

import TextArea from "@/app/components/TextArea";
import FeedBox from "@/app/components/FeedBox";
import { useState } from "react";

export default function Feed() {

  const [postContent, setPostContent] = useState("");

  const handleImageUpload = async (file: File): Promise<string> => {
    // Aqui você implementaria a lógica de upload da imagem para seu servidor
    // Por enquanto, vamos apenas criar uma URL local para demonstração
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePostSubmit = () => {
    console.log('Conteúdo do post:', postContent);
    // Aqui você implementaria a lógica para enviar o post para o servidor
    setPostContent("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Área de criação de post */}
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg mb-6">
        <div className="flex flex-col gap-4">
          <TextArea
            onChange={(content) => setPostContent(content)}
            placeholder="O que você está pensando?"
            initialValue=""
            onImageUpload={handleImageUpload}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handlePostSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Publicar</button>
        </div>
      </div>

      <FeedBox userName="Nome do Usuário" timeAgo="2 horas atrás" content="Este é um exemplo de post no feed. Aqui vai o conteúdo da publicação." />
    </div>
  );
}
