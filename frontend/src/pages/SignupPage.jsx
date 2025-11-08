import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const SignupPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Sign Up Page
        </Typography>
        <Typography color="text.secondary">
          Create your account here.
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupPage;
