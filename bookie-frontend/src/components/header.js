import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Blackdot Library
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/add-book" sx={{ mr: 2 }}>
          Add Book
        </Button>
        {/* <Button color="inherit" component={Link} to="/SignIn-Up">
          Sign In / Up
        </Button> */}
      </Toolbar>
    </AppBar>
  );
}
