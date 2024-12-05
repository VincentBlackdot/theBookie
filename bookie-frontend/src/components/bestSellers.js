import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Card, CardContent, CardMedia, Link } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import apiService from '../services/apiService';// Import the API service
import { Link as RouterLink } from 'react-router-dom'; // Import the Link component from react-router-dom

export function Bestsellers() {
  const [bestsellers, setBestsellers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch books and filter for bestsellers
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const booksData = await apiService.getBooks();
        if (Array.isArray(booksData.data)) {
          const filteredBestsellers = booksData.data.filter(book => book.isBestSeller);
          setBestsellers(filteredBestsellers);
        } else {
          console.error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching bestsellers:', err);
      }
    };

    fetchBestSellers();
  }, []);



  // Auto-rotate the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (bestsellers.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bestsellers.length);
      }
    }, 3000);
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [bestsellers]);

  const nextBook = () => {
    if (bestsellers.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bestsellers.length);
    }
  };

  const prevBook = () => {
    if (bestsellers.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + bestsellers.length) % bestsellers.length);
    }
  };

  // Get the next 2 books after the current one for a total of 3
  const displayedBooks = [
    bestsellers[currentIndex],
    bestsellers[(currentIndex + 1) % bestsellers.length],
    bestsellers[(currentIndex + 2) % bestsellers.length],
  ].filter(Boolean); // Filter out undefined values

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Bestsellers
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={prevBook} disabled={bestsellers.length === 0}>
          <ChevronLeft />
        </IconButton>

        {displayedBooks.map((book) => (
          <Card sx={{ display: 'flex', width: 300, m: 2 }} key={book._id}>
            <CardMedia
              component="img"
              sx={{ width: 100 }}
              src={book.coverUrl} // Use book's cover or fallback image
              alt={book?.title || 'No Title'}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6">
                  {book?.title || 'Unknown Title'}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {book?.author || 'Unknown Author'}
                </Typography>
                {/* Use Link directly for routing */}
                <Link component={RouterLink} to={`/preview/${book._id}`} variant="body2" color="primary" sx={{ textDecoration: 'none' }}>
                  View Details
                </Link>
              </CardContent>
            </Box>
          </Card>
        ))}

        <IconButton onClick={nextBook} disabled={bestsellers.length === 0}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
}
