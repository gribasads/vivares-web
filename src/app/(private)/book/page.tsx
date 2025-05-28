import BookBlock from "@/app/components/BookBlock";
import Button from "@/app/components/Button";


export default function Book() {
    return (
      <main >
        <div className="flex justify-end p-4">
        <Button variant="primary" className="w-48 p-4">
          <p>
           Minhas Reservas
          </p>
        </Button>
        </div>
        <div className="flex justify-start pl-4">
          <BookBlock />
        </div>
      </main>
    );
  }
  