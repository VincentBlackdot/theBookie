import { Grid, Card, CardContent, CardMedia, Typography, Chip, Link as MuiLink, Link} from '@mui/material'
const featuredBooks = [
  { id: 1, title: 'Neuromancer', author: 'William Gibson', cover: '/placeholder.svg?height=300&width=200', category: 'Science Fiction' },
  { id: 2, title: 'Dune', author: 'Frank Herbert', cover: '/placeholder.svg?height=300&width=200', category: 'Science Fiction' },
  { id: 3, title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', cover: '/placeholder.svg?height=300&width=200', category: 'Science Fiction' },
];

export function FeaturedBooks() {
  return (
    <section>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Featured Books
      </Typography>
      <Grid container spacing={4}>
        {featuredBooks.map((book) => (
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
                  <Chip label={book.category} size="small" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}