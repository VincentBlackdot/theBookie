'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Rating, Chip, Button } from '@mui/material';
import { Download, LibraryBooks } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';
import { Link as RouterLink } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await apiService.getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleDownload = async () => {
    if (!book || isDownloading) return;

    setIsDownloading(true);
    try {
      // Update download count
      const response = await apiService.incrementDownloads(id);
      setBook(response.data);
      
      // Start download
      window.open(book.pdfUrl, '_blank');
    } catch (error) {
      console.error('Error downloading book:', error);
    }
    setIsDownloading(false);
  };

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
          <Chip 
            label={`${book.downloads || 0} downloads`} 
            sx={{ mb: 2, mr: 1 }}
            color="primary"
            variant="outlined"
          /> 
          {book.isBestSeller && (
            <Chip 
              label="Bestseller" 
              color="primary"
              sx={{ mb: 2, mr: 1 }} 
            />
          )}
          {book.isFeatured && (
            <Chip 
              label="Featured"
              color="secondary"
              sx={{ mb: 2 }} 
            />
          )}
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
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? 'Downloading...' : 'Download PDF'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
