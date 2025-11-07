import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Avatar } from '@mui/material';
import { Chat } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const AiChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, margin: '0 auto', mb: 2, bgcolor: 'primary.main' }}>
              <Chat sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" gutterBottom fontWeight={600}>AI Chat Assistant</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Ask me anything about your studies!</Typography>
            <TextField fullWidth placeholder="Type your question..." sx={{ mb: 2 }} />
            <Button variant="contained" size="large">Send Message</Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};
export default AiChatPage;
