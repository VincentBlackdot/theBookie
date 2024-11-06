// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api';
import './BookList.css';

function BookList({ onEdit }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks(); // Refresh book list after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="book-list-container">
      <h2 className="book-list-title">Book List</h2>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
            <div className="book-actions">
              <button className="edit-button" onClick={() => onEdit(book)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
