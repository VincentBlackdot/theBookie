import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/apiService';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        if (Array.isArray(booksData.data)) {
          setBooks(booksData.data);
        } else {
          setError('Invalid data format received from the server.');
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : books.length > 0 ? (
        books.map((book) => (
          <div key={book._id}>
           
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.ISBN}</p>
            <p>ISBN: {book.isBestSeller}</p>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookList;
