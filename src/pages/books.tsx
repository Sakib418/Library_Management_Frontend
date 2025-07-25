
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { useState } from "react";
import { FaEdit, FaTrash, FaBookReader } from "react-icons/fa";
import Swal from "sweetalert2";
import { EditBookModal } from "./EditBookModal";
import { BorrowBookModal } from "./BorrowBookModal";


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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
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
  <div className="p-4 sm:p-8 md:p-12">
    <div className="flex justify-between items-center">
<h2 className="text-2xl font-semibold mb-4">Book List</h2>
   
    </div>

    <div className="block md:hidden space-y-4">
      {books.map((book) => {
        const isAvailable = book.copies > 0;
        
        return (
            
          <div
            key={book._id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  title="Edit"
                  className="bg-blue-200 text-blue-700 p-2 rounded hover:bg-blue-300 hover:text-blue-800 transition-colors duration-200"
                  aria-label={`Edit ${book.title}`}
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => handleBorrow(book)}
                  title="Borrow"
                  className="bg-yellow-200 text-yellow-700 p-2 rounded hover:bg-yellow-300 hover:text-yellow-800 transition-colors duration-200"
                  aria-label={`Borrow ${book.title}`}
                >
                  <FaBookReader size={16} />
                </button>
                <button
                  onClick={() => handleDelete(book)}
                  title="Delete"
                  className="bg-red-200 text-red-700 p-2 rounded hover:bg-red-300 hover:text-red-800 transition-colors duration-200"
                  aria-label={`Delete ${book.title}`}
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="font-semibold">Author:</span> {book.author}</p>
              <p><span className="font-semibold">Genre:</span> {book.genre}</p>
              <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
              <p><span className="font-semibold">Copies:</span> {book.copies}</p>
              <p>
                <span className="font-semibold">Available:</span>{" "}
                {isAvailable ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-600 font-medium">No</span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>


    <div className="hidden md:block overflow-x-auto rounded-xl">
      <table className="table-auto w-full border border-gray-300 shadow-sm ">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left text-base">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Genre</th>
            <th className="px-4 py-2 border">ISBN</th>
            <th className="px-4 py-2 border text-center">Copies</th>
            <th className="px-4 py-2 border text-center">Available</th>
            <th className="px-4 py-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-base">
          {books.map((book) => {
            const isAvailable = book.copies > 0;
            return (
              <tr
                key={book._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 border">{book.title}</td>
                <td className="px-4 py-2 border">{book.author}</td>
                <td className="px-4 py-2 border">{book.genre}</td>
                <td className="px-4 py-2 border">{book.isbn}</td>
                <td className="px-4 py-2 border text-center">{book.copies}</td>
                <td className="px-4 py-2 border text-center">
                  {isAvailable ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </td>
                <td className="px-4 py-2 border space-x-2 text-center">
                  <button
                    onClick={() => handleEdit(book)}
                    title="Edit"
                    className="bg-blue-200 text-blue-700 p-2 rounded hover:bg-blue-300 hover:text-blue-800 transition-colors duration-200"
                    aria-label={`Edit ${book.title}`}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleBorrow(book)}
                    title="Borrow"
                    className="bg-yellow-200 text-yellow-700 p-2 rounded hover:bg-yellow-300 hover:text-yellow-800 transition-colors duration-200"
                    aria-label={`Borrow ${book.title}`}
                  >
                    <FaBookReader size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(book)}
                    title="Delete"
                    className="bg-red-200 text-red-700 p-2 rounded hover:bg-red-300 hover:text-red-800 transition-colors duration-200"
                    aria-label={`Delete ${book.title}`}
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {selectedBook && (
  <EditBookModal
    book={selectedBook}
    onClose={() => setSelectedBook(null)}
  />
  
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
