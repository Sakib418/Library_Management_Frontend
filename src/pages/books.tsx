
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { useState } from "react";
import { FaEdit, FaTrash, FaBookReader } from "react-icons/fa";
import Swal from "sweetalert2";
import { EditBookModal } from "./EditBookModal";
import { BorrowBookModal } from "./BorrowBookModal";
import { Skeleton } from "@/components/ui/skeleton";

type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  description: string;
  book: string;
};

export default function Books() {

  const [deleteBook] = useDeleteBookMutation();
  const { data, isLoading, isError } = useGetBooksQuery(undefined,{
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  });
  const books: Book[] = data?.data || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBookForBorrow, setSelectedBookForBorrow] = useState<Book | null>(null);

  //if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  
  if (isLoading) {
  return (
    <div className="p-4 sm:p-8 md:p-12 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-foreground">📚 Book List</h2>
      </div>

      <div className="block md:hidden space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-white dark:bg-gray-900 p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, idx) => (
                  <Skeleton key={idx} className="h-8 w-8 rounded-md" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        ))}
      </div>


      <div className="hidden md:block overflow-x-auto rounded-xl border border-border shadow-sm">
        <table className="min-w-full table-auto">
          <thead className="bg-muted text-left text-sm uppercase tracking-wide">
            <tr>
              {["Title", "Author", "Genre", "ISBN", "Copies", "Available", "Actions"].map((header) => (
                <th key={header} className="px-4 py-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {[...Array(5)].map((_, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                {[...Array(7)].map((__, j) => (
                  <td key={j} className="px-4 py-3">
                    {j === 6 ? (
                      <div className="flex justify-center space-x-1">
                        {[...Array(3)].map((_, idx) => (
                          <Skeleton key={idx} className="h-8 w-8 rounded-md" />
                        ))}
                      </div>
                    ) : (
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

  

  if (isError) return <p className="text-center text-red-500 mt-10">Error loading books.</p>;

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    console.log("Editing:", book);
  };
  
  const handleDelete = async  (book: Book) => {
  
    
    const result = await Swal.fire({
    title: `Delete "${book.title}"?`,
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });
  if (result.isConfirmed) {
    try {
      await deleteBook(book._id).unwrap();
      Swal.fire('Deleted!', `"${book.title}" has been deleted.`, 'success');
    } catch (error: any) {
      Swal.fire('Error', error?.data?.message || 'Failed to delete book', 'error');
    }
  }
  };

  const handleBorrow = (book: Book) => {
    console.log("Borrowing:", book.title);
    setSelectedBookForBorrow(book);
    setIsModalOpen(true);
   // <BorrowBookModal bookId={book._id} bookTitle={book.title} />
  };

  return (
<div className="p-4 sm:p-8 md:p-12 space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-semibold text-foreground">📚 Book List</h2>
  </div>

  {/* Mobile View */}
  <div className="block md:hidden space-y-4">
    {books.map((book) => {
      const isAvailable = book.copies > 0;

      return (
        <div
          key={book._id}
          className="rounded-xl border border-border bg-white dark:bg-gray-900 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.genre}</p>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => handleEdit(book)}
                title="Edit"
                className="p-2 rounded-md bg-muted hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
              >
                <FaEdit size={16} />
              </button>
              <button
                onClick={() => handleBorrow(book)}
                title="Borrow"
                className="p-2 rounded-md bg-muted hover:bg-yellow-100 dark:hover:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
              >
                <FaBookReader size={16} />
              </button>
              <button
                onClick={() => handleDelete(book)}
                title="Delete"
                className="p-2 rounded-md bg-muted hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Author:</span> {book.author}
            </p>
            <p>
              <span className="font-medium text-foreground">ISBN:</span> {book.isbn}
            </p>
            <p>
              <span className="font-medium text-foreground">Copies:</span> {book.copies}
            </p>
            <p>
              <span className="font-medium text-foreground">Available:</span>{" "}
              {isAvailable ? (
                <span className="text-green-600 font-semibold">Yes</span>
              ) : (
                <span className="text-red-600 font-semibold">No</span>
              )}
            </p>
          </div>
        </div>
      );
    })}
  </div>

 
  <div className="hidden md:block overflow-x-auto rounded-xl border border-border shadow-sm">
    <table className="min-w-full table-auto">
      <thead className="bg-muted text-left text-sm uppercase tracking-wide">
        <tr>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Author</th>
          <th className="px-4 py-3">Genre</th>
          <th className="px-4 py-3">ISBN</th>
          <th className="px-4 py-3 text-center">Copies</th>
          <th className="px-4 py-3 text-center">Available</th>
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm text-foreground">
        {books.map((book, index) => {
          const isAvailable = book.copies > 0;
          return (
            <tr
              key={book._id}
              className={index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
            >
              <td className="px-4 py-3">{book.title}</td>
              <td className="px-4 py-3">{book.author}</td>
              <td className="px-4 py-3">{book.genre}</td>
              <td className="px-4 py-3">{book.isbn}</td>
              <td className="px-4 py-3 text-center">{book.copies}</td>
              <td className="px-4 py-3 text-center">
                {isAvailable ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-600 font-medium">No</span>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center space-x-1">
                  <button
                    onClick={() => handleEdit(book)}
                    title="Edit"
                    className="p-2 rounded-md bg-muted hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleBorrow(book)}
                    title="Borrow"
                    className="p-2 rounded-md bg-muted hover:bg-yellow-100 dark:hover:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
                  >
                    <FaBookReader size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(book)}
                    title="Delete"
                    className="p-2 rounded-md bg-muted hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

 
  {selectedBook && (
    <EditBookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
  )}
  {selectedBookForBorrow && (
    <BorrowBookModal
      book={selectedBookForBorrow}
      open={isModalOpen}
      setOpen={setIsModalOpen}
    />
  )}
</div>


);

}
