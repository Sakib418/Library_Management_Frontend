
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { useState } from "react";
import { FaEdit, FaTrash, FaBookReader } from "react-icons/fa";
import { AddBookModal } from "./AddBookModal";


type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
};

export default function Books() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const books: Book[] = data?.data || [];

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Error loading books.</p>;

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    console.log("Editing:", book);
  };

  const handleDelete = (book: Book) => {
    if (confirm(`Are you sure to delete "${book.title}"?`)) {
      console.log("Delete:", book._id);
      // call delete API here
    }
  };

  const handleBorrow = (book: Book) => {
    console.log("Borrowing:", book.title);
    // open borrow form/modal here
  };

  return (
  <div className="p-4 sm:p-8 md:p-12">
    <div className="flex justify-between items-center">
<h2 className="text-2xl font-semibold mb-4">Book List</h2>
    <AddBookModal/>
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


    <div className="hidden md:block overflow-x-auto">
      <table className="table-auto w-full border border-gray-300 shadow-sm">
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
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <p className="text-lg font-bold">Edit Form (Preview)</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Title: {selectedBook.title}
        </p>
        {/* Add edit form here */}
      </div>
    )}
  </div>
);

}
