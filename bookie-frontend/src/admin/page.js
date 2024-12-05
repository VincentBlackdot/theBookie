'use client'
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Switch,
  Rating,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  TablePagination,
  TableSortLabel,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import axios from 'axios';

function AdminPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Search and sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
    } catch (error) {
      setMessage({ 
        text: 'Error fetching books. Please try again.',
        type: 'error'
      });
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookId, field, value) => {
    try {
      const updateData = {
        isBestSeller: field === 'isBestSeller' ? value : books.find(b => b._id === bookId).isBestSeller,
        isFeatured: field === 'isFeatured' ? value : books.find(b => b._id === bookId).isFeatured,
      };

      await axios.put(`http://localhost:3000/books/${bookId}/status`, updateData);
      
      setBooks(books.map(book => 
        book._id === bookId 
          ? { ...book, [field]: value }
          : book
      ));

      setMessage({ text: 'Book updated successfully!', type: 'success' });
      setOpenSnackbar(true);
    } catch (error) {
      setMessage({ 
        text: 'Error updating book. Please try again.',
        type: 'error'
      });
      setOpenSnackbar(true);
    }
  };

  const handleRatingUpdate = async (bookId, newValue) => {
    try {
      await axios.put(`http://localhost:3000/books/${bookId}`, {
        rating: newValue
      });
      
      setBooks(books.map(book => 
        book._id === bookId 
          ? { ...book, rating: newValue }
          : book
      ));

      setMessage({ text: 'Rating updated successfully!', type: 'success' });
      setOpenSnackbar(true);
    } catch (error) {
      setMessage({ 
        text: 'Error updating rating. Please try again.',
        type: 'error'
      });
      setOpenSnackbar(true);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleSort(property);
  };

  // Filter and sort books
  const filteredBooks = books
    .filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.ISBN?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const isAsc = order === 'asc';
      switch (orderBy) {
        case 'title':
        case 'author':
          return isAsc 
            ? a[orderBy].localeCompare(b[orderBy])
            : b[orderBy].localeCompare(a[orderBy]);
        case 'createdAt':
          return isAsc
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
        case 'rating':
          return isAsc
            ? a.rating - b.rating
            : b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Paginate books
  const paginatedBooks = filteredBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Admin Dashboard - Book Management
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by title, author, or ISBN..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={clearSearch} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={createSortHandler('title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'author'}
                  direction={orderBy === 'author' ? order : 'asc'}
                  onClick={createSortHandler('author')}
                >
                  Author
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Featured</TableCell>
              <TableCell align="center">Best Seller</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'rating'}
                  direction={orderBy === 'rating' ? order : 'asc'}
                  onClick={createSortHandler('rating')}
                >
                  Rating
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBooks.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={book.isFeatured}
                    onChange={(e) => handleStatusUpdate(book._id, 'isFeatured', e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={book.isBestSeller}
                    onChange={(e) => handleStatusUpdate(book._id, 'isBestSeller', e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Rating
                    value={book.rating}
                    precision={0.5}
                    onChange={(event, newValue) => handleRatingUpdate(book._id, newValue)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredBooks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

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

export default AdminPage;
