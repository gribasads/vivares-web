import books from "@/mocks/books.json";

export default function Book() {
    return (
      <main className="flex flex-row gap-5 p-5">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-10 rounded-md shadow-md">
            <img src="logo/logo.png" alt={book.name} width={100} height={100} />
            <h1 className="text-xl font-bold">{book.name}</h1>
            <p className="text-sm text-[#6b7280]">{book.needPaid && "Necessita pagamento"}</p>
          </div>
        ))}
      </main>
    );
  }
  