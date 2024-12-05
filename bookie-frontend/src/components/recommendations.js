import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, CircularProgress, Pagination, Stack } from '@mui/material';
import { Grid, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

export function Recommendations() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top of the section when page changes
    window.scrollTo({
      top: document.querySelector('#all-books-section').offsetTop - 20,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ mt: 4, textAlign: 'center' }}>
        {error}
      </Typography>
    );
  }

  if (books.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
        No books available
      </Typography>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (page - 1) * booksPerPage;
  const paginatedBooks = books.slice(startIndex, startIndex + booksPerPage);

  return (
    <section id="all-books-section">
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
        All Books
      </Typography>
      <Grid container spacing={4}>
        {paginatedBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Link component={RouterLink} to={`/preview/${book._id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                transition: '0.3s', 
                '&:hover': { 
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                } 
              }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={book.coverUrl || '/placeholder.svg?height=300&width=200'}
                  alt={book.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h3">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {book.author}
                  </Typography>
                  {book.rating > 0 && (
                    <Chip 
                      label={`Rating: ${book.rating}`} 
                      size="small" 
                      sx={{ mt: 1, mr: 1 }} 
                    />
                  )}
                  {book.isBestSeller && (
                    <Chip 
                      label="Bestseller" 
                      color="primary"
                      size="small" 
                      sx={{ mt: 1, mr: 1 }} 
                    />
                  )}
                  {book.isFeatured && (
                    <Chip 
                      label="Featured"
                      color="secondary"
                      size="small" 
                      sx={{ mt: 1 }} 
                    />
                  )}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      
      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" sx={{ mt: 4, mb: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </section>
  );
}
