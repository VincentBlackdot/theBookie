'use client'

import { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

export default function RequestPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Book request submitted:', { title, author, description });
    
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show a success message
    setOpenSnackbar(true);

    // Clear the form
    setTitle('');
    setAuthor('');
    setDescription('');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Request a Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit Request
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Thank you for your book request. We'll review it soon!"
      />
    </Container>
  );
}

