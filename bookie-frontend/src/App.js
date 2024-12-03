import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Search } from './components/search';
import { FeaturedBooks } from './components/featured-books';
import { Recommendations } from './components/recommendations';
import { Auth } from './components/auth';
import { Bestsellers } from './components/bestSellers';
import { UserPreferences } from './components/user-preferences';
import { Header } from './components/header';
import { RecentlyAddedBooks } from './components/recently-added-books';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import routing components
import AddBook from './add-book/page'
import Login from './auth/page'
import OverView from './components/book/bookDetails';
import ReadOnline from './components/book/read';
import API from './services/apiService';
import BookList from './components/BookList';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header /> {/* Place Header outside Routes so it appears on all pages */}
        
        <Routes>
          <Route path="/add-book" element={<AddBook />} /> {/* Route for the Add Book page */}
          <Route path="/SignIn-Up" element={<Login />} /> {/* Route for the Add Book page */}
          <Route path="/preview/:id" element={<OverView />} /> {/* Route for the Add Book page */}
          <Route path="/readOnline/:id" element={<ReadOnline />} /> {/* Route for the Add Book page */}
          <Route path="/" element={
            <main>
              <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                  <Typography variant="h2" component="h1" gutterBottom align="center" 
                    sx={{ 
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #90caf9 30%, #f48fb1 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                    The Blackdot Library
                  </Typography>
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Explore the universe of knowledge at your fingertips
                  </Typography>
                  <Search />
                  <Bestsellers />
                  {/* <FeaturedBooks /> */}
                  <RecentlyAddedBooks />
                  {/* <Recommendations /> */}
                  {/* <BookList /> */}
                  <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 4 }}>
                    {/* <Auth /> */}
                    <UserPreferences />
                  </Box>
                </Box>
              </Container>
            </main>
          } /> {/* Default route (home page) */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
