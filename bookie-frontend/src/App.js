// src/App.js
import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  const [bookToEdit, setBookToEdit] = useState(null);

  const handleEdit = (book) => {
    setBookToEdit(book);
  };

  const handleFormSubmit = () => {
    setBookToEdit(null); // Clear form after submission
  };

  return (
    <div>
      <h1>Book Library - Bookie</h1>
      <BookForm bookToEdit={bookToEdit} onFormSubmit={handleFormSubmit} />
      <BookList onEdit={handleEdit} />
    </div>
  );
}

export default App;
