'use client'
import axios from 'axios';

import { useState } from 'react';
import { Container, Typography, TextField, Button, Rating, Box } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
// import apiService from '../services/apiService';  // Import the apiService

export default function AddBookPage() {
  const [bookData, setBookData] = useState({
    name: '',
    isbn: '',
    author: '',
    rating: 0,
    description: '',
  });
  const [pdf, setPdf] = useState(null);
  const [cover, setCover] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setBookData((prevData) => ({
      ...prevData,
      rating: newValue,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'pdf' && file && file.type === 'application/pdf') {
      setPdf(file);
    } else if (type === 'cover' && file && file.type.startsWith('image/')) {
      setCover(file);
    } else {
      alert(`Please upload a valid ${type === 'pdf' ? 'PDF' : 'image'} file`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Attach form data
    formData.append('title', bookData.name);
    formData.append('author', bookData.author);
    const isbn = bookData.isbn.replace(/\D/g, '');
    if (isbn.length === 13) {
      formData.append('ISBN', isbn);
    } else {
      console.error('Invalid ISBN format');
      return;
    }
  
    if (bookData.description) formData.append('description', bookData.description);
    if (bookData.rating) formData.append('rating', bookData.rating);
  
    // Attach files with correct field names
    if (pdf) formData.append('pdfFile', pdf);  // Matches backend 'pdfFile'
    if (cover) formData.append('coverFile', cover); // Matches backend 'coverFile'
    
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    try {
      const response = await axios.post('http://localhost:3000/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book created:', response.data);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };
  
  
  
  
  
  
  
  
  


  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Add New Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Book Name"
          name="name"
          value={bookData.name}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="ISBN"
          name="isbn"
          value={bookData.isbn}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Author"
          name="author"
          value={bookData.author}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={bookData.rating}
            onChange={handleRatingChange}
          />
        </Box>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={bookData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 2, mb: 2 }}
        >
          Upload PDF
          <input
            type="file"
            hidden
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, 'pdf')}
          />
        </Button>
        {pdf && <Typography variant="body2">PDF: {pdf.name}</Typography>}
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 2, mb: 2 }}
        >
          Upload Cover Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'cover')}
          />
        </Button>
        {cover && <Typography variant="body2">Cover: {cover.name}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Book
        </Button>
      </form>
    </Container>
  );
}
