import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Avatar } from '@mui/material';
import { Calculate } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const SolverPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, margin: '0 auto', mb: 2, bgcolor: 'success.main' }}>
              <Calculate sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" gutterBottom fontWeight={600}>Math Solver</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Solve complex mathematical problems with AI</Typography>
            <TextField fullWidth placeholder="Enter your math problem..." sx={{ mb: 2 }} multiline rows={4} />
            <Button variant="contained" color="success" size="large">Solve Problem</Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};
export default SolverPage;Create SolverPage
