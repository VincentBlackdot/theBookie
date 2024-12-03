import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Chip, Link, CircularProgress } from '@mui/material';
import apiService from '../services/apiService';
import { Link as RouterLink } from 'react-router-dom'; 

export function RecentlyAddedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Bestsellers:", books);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await apiService.getBooks();
        if (Array.isArray(booksData.data)) {
          setBooks(booksData.data);
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <section>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Recently Added Books
      </Typography>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Link component={RouterLink} to={`/preview/${book._id}`}  passHref style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={book.coverUrl || '/placeholder.svg?height=300&width=200'} // Fallback if cover is missing
                  alt={book.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Chip label={`${book.downloads || 0} downloads`} size="small" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
