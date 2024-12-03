import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';

export default function ReadPage() {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await apiService.getBookById(id);
        setPdfUrl(response.data.pdfUrl);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!pdfUrl) {
    return (
      <Container>
        <Typography>Loading the PDF...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Click the button below to read the PDF:
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.open(pdfUrl, '_blank')}
      >
        Open PDF in Browser
      </Button>
    </Container>
  );
}
