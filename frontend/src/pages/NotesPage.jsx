import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Notes Page
        </Typography>
        <Typography color="text.secondary">
          Your notes will appear here.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotesPage;
