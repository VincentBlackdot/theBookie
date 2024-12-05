import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Chip, Link as MuiLink, Link, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

export function FeaturedBooks() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        const books = response.data;
        setFeaturedBooks(books.filter(book => book.isFeatured));
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (featuredBooks.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
        No featured books available
      </Typography>
    );
  }

  return (
    <section>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Featured Books
      </Typography>
      <Grid container spacing={4}>
        {featuredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Link href={`/preview/${book._id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={book.coverUrl || '/placeholder.svg?height=300&width=200'}
                  alt={book.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
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