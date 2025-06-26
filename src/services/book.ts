import { api } from "./api";
import { Book } from "@/app/types/book";

export const bookService = {
    async book(book: Book): Promise<Book> {
        const { data } = await api.post<Book>('/books', book);
        return data;
    }
}