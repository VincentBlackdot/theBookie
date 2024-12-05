import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Chip, Link, CircularProgress, Box } from '@mui/material';
import apiService from '../services/apiService';
import { Link as RouterLink } from 'react-router-dom'; 

export function RecentlyAddedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await apiService.getBooks();
        if (Array.isArray(booksData.data)) {
          // Sort books by creation date (assuming MongoDB's _id contains timestamp)
          const sortedBooks = booksData.data.sort((a, b) => {
            return b._id.localeCompare(a._id);
          });
          // Take only the top 3 most recent books
          setBooks(sortedBooks.slice(0, 3));
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

  return (
    <section>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Recently Added Books
      </Typography>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Link component={RouterLink} to={`/preview/${book._id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
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
                  <Typography variant="body2" color="text.secondary">
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
                      size="small" 
                      color="primary"
                      sx={{ mt: 1 }} 
                    />
                  )}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
