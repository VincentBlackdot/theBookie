'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Rating, Chip, Button } from '@mui/material';
import { Download, LibraryBooks } from '@mui/icons-material'; // Replaced BookOpen with LibraryBooks
import { useParams } from 'react-router-dom';  // Import useParams from react-router-dom
import apiService from '../../services/apiService'; 
import { Link as RouterLink } from 'react-router-dom'; // Import the Link component from react-router-dom

export default function BookPage() {
  const { id } = useParams();  // Get the id from the URL

  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch the book by ID
    const fetchBook = async () => {
      try {
        const response = await apiService.getBookById(id);  // Use the id from URL
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    if (id) {
      fetchBook();  // Make sure the id is valid before calling the API
    }
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }


  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <img src={book.coverUrl} alt={book.title} style={{ width: '100%', height: 'auto' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>
          <Rating value={book.rating} readOnly precision={0.5} sx={{ mb: 2 }} />
          <Chip label={`${book.downloads} downloads`} sx={{ mb: 2 }} />
          <Typography variant="body1" paragraph>
            {book.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            ISBN: {book.ISBN}
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
            <Button
  variant="contained"
  startIcon={<Download />}
  href={book.pdfUrl}
  target="_blank"
  onClick={async () => {
    try {
      await apiService.incrementDownloads(id); // Call the increment API
    } catch (error) {
      console.error('Failed to increment downloads:', error);
    }
  }}
>
  Download PDF
</Button>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
