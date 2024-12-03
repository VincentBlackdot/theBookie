import { useState } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function Search() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <Box sx={{ width: '50%', margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSearch} style={{ width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            sx: {
              borderRadius: '30px', // Rounded corners
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
              paddingRight: '10px', // Add some padding to the right for icon spacing
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
  );
}
