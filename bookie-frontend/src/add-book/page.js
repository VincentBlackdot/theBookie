'use client'
import axios from 'axios';

import { useState } from 'react';
import { Container, Typography, TextField, Button, Rating, Box, CircularProgress, Alert, Snackbar } from '@mui/material';
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);


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
    setLoading(true);
    setMessage({ text: '', type: '' });
  
    const formData = new FormData();
  
    // Attach form data
    formData.append('title', bookData.name);
    formData.append('author', bookData.author);
    const isbn = bookData.isbn.replace(/\D/g, '');
    if (isbn.length === 13) {
      formData.append('ISBN', isbn);
    } else {
      setMessage({ text: 'Invalid ISBN format. Please enter a valid 13-digit ISBN.', type: 'error' });
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }
  
    if (bookData.description) formData.append('description', bookData.description);
    if (bookData.rating) formData.append('rating', bookData.rating);
  
    // Attach files with correct field names
    if (pdf) formData.append('pdfFile', pdf);
    if (cover) formData.append('coverFile', cover);
    
    try {
      const response = await axios.post('http://localhost:3000/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage({ text: 'Book added successfully!', type: 'success' });
      setOpenSnackbar(true);
      // Reset form
      setBookData({
        name: '',
        isbn: '',
        author: '',
        rating: 0,
        description: '',
      });
      setPdf(null);
      setCover(null);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Error adding book. Please try again.',
        type: 'error'
      });
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
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
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ position: 'relative' }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            ) : (
              'Add Book'
            )}
          </Button>
        </Box> 
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={message.type} 
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
}
