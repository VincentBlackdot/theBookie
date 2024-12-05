import { Container, Typography, Box } from '@mui/material';
import { Search } from './search';
import { FeaturedBooks } from './featured-books';
import { Recommendations } from './recommendations';
import { Bestsellers } from './bestSellers';
import { RecentlyAddedBooks } from './recently-added-books';

export default function Home() {
  return (
    <main>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #90caf9 30%, #f48fb1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Blackdot Library
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary" 
            paragraph
          >
            Explore the universe of knowledge at your fingertips
          </Typography>
          <Search />
          <Bestsellers />
          <FeaturedBooks />
          <RecentlyAddedBooks />
          <Recommendations />
        </Box>
      </Container>
    </main>
  );
}
