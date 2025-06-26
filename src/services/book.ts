import { api } from "./api";
import { Book } from "@/app/types/book";

interface BookResponse {
    placeName: string;
    dateHour: string;
    reason: string;
    guests: string[];
    status: "pending" | "approved" | "rejected";
}

export const bookService = {
    async book(book: Book): Promise<Book> {
        const { data } = await api.post<Book>('/books', book);
        return data;
    },
    
    async getBooksByUser(userId: string): Promise<BookResponse[]> {
        const { data } = await api.get<BookResponse[]>(`/books/user/${userId}`);
        return data;
    }
}