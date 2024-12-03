import { useState } from 'react';
import { Card, CardContent, Typography, Switch, FormControlLabel, Select, MenuItem, Slider, Button } from '@mui/material';

export function UserPreferences() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(50);

  const handleSave = () => {
    console.log('Preferences saved', { darkMode, fontSize, textToSpeechEnabled, highContrastMode, readingSpeed });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          User Preferences
        </Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
          label="Dark Mode"
        />
        <Typography gutterBottom>Font Size</Typography>
        <Select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="large">Large</MenuItem>
        </Select>
        <FormControlLabel
          control={<Switch checked={textToSpeechEnabled} onChange={(e) => setTextToSpeechEnabled(e.target.checked)} />}
          label="Text-to-Speech"
        />
        <FormControlLabel
          control={<Switch checked={highContrastMode} onChange={(e) => setHighContrastMode(e.target.checked)} />}
          label="High Contrast Mode"
        />
        <Typography gutterBottom>Reading Speed</Typography>
        <Slider
          value={readingSpeed}
          onChange={(e, newValue) => setReadingSpeed(newValue)}
          aria-labelledby="reading-speed-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={100}
        />
        <Button variant="contained" color="primary" onClick={handleSave} fullWidth sx={{ mt: 2 }}>
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}

