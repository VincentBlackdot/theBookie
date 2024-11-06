// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import { createBook, updateBook } from '../api';
import './BookForm.css';

function BookForm({ bookToEdit, onFormSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [ISBN, setISBN] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setISBN(bookToEdit.ISBN || '');
    }
  }, [bookToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = { title, author, ISBN };

    try {
      if (bookToEdit) {
        await updateBook(bookToEdit.id, bookData);
      } else {
        await createBook(bookData);
      }
      onFormSubmit();
      setTitle('');
      setAuthor('');
      setISBN('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{bookToEdit ? 'Edit Book' : 'Add New Book'}</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter book title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          placeholder="Enter author's name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="ISBN">ISBN (optional):</label>
        <input
          id="ISBN"
          type="text"
          value={ISBN}
          onChange={(e) => setISBN(e.target.value)}
          placeholder="Enter ISBN"
        />
      </div>
      <button className="submit-button" type="submit">
        {bookToEdit ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
}

export default BookForm;
