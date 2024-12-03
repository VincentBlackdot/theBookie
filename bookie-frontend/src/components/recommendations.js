import { Box, Badge, Typography, ImageListItem, ImageListItemBar, Link as MuiLink, Link } from '@mui/material'
import { Grid, Card, CardContent, CardMedia, Chip } from '@mui/material';


const recommendedBooks = [
  { id: 1, title: 'The Quantum Paradox', author: 'Dr. Elara Vance', cover: '/placeholder.svg?height=300&width=200' },
  { id: 2, title: 'Echoes of Eternity', author: 'Zephyr Nightshade', cover: '/placeholder.svg?height=300&width=200' },
  { id: 3, title: 'Cybernetic Dreams', author: 'Nova Sterling', cover: '/placeholder.svg?height=300&width=200' },
];

export function Recommendations() {
  return (
    <section>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Recommended for You
      </Typography>
      <Grid container spacing={4}>
        {recommendedBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Link href={`/book/${book.id}`} passHref style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={book.cover}
                  alt={book.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Chip label="Recommended" color="secondary" size="small" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}

