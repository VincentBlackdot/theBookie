import { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, Box, Typography, Grid, Card, CardContent, CardMedia, Chip, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

export function Search() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setFilteredBooks(books);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filtered);
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Immediate filtering as user types
    if (!newQuery.trim()) {
      setFilteredBooks(books);
      return;
    }

    const searchTerm = newQuery.toLowerCase();
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filtered);
  };

  return (
    <Box sx={{ width: '100%', margin: '20px 0' }}>
      <Box sx={{ width: '50%', margin: '0 auto', marginBottom: '30px' }}>
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by title or author..."
            value={query}
            onChange={handleInputChange}
            InputProps={{
              sx: {
                borderRadius: '30px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                paddingRight: '10px',
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end" sx={{ color: '#1976d2' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>

      {query && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Search Results {filteredBooks.length > 0 ? `(${filteredBooks.length} books found)` : ''}
          </Typography>
          
          {filteredBooks.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
              No books found matching your search
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {filteredBooks.map((book) => (
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
          )}
        </Box>
      )}
    </Box>
  );
}
