import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import { Send } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const AiChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      setError('Please enter a message');
      return;
    }

    // Add user message to chat
    const userMessage = { role: 'user', content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${backendURL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory: messages
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.response) {
        const aiMessage = { role: 'ai', content: data.response };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        setError(data.message || 'Failed to get response from AI');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to send message. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 4, minHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Messages */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 3, maxHeight: '50vh' }}>
              {messages.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Avatar sx={{ width: 80, height: 80, margin: '0 auto', mb: 2, bgcolor: 'primary.main' }}>
                    <Typography sx={{ fontSize: 40 }}>💬</Typography>
                  </Avatar>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    AI Chat Assistant
                  </Typography>
                  <Typography color="text.secondary">
                    Ask me anything about your studies!
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {messages.map((msg, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        mb: 2,
                        display: 'flex',
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          maxWidth: '70%',
                          bgcolor: msg.role === 'user' ? 'primary.main' : 'grey.200',
                          color: msg.role === 'user' ? 'white' : 'black'
                        }}
                      >
                        <Typography variant="body1">{msg.content}</Typography>
                      </Paper>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>
              )}
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Input Section */}
            <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type your question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
                multiline
                maxRows={4}
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="contained"
                endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                onClick={handleSendMessage}
                disabled={loading || !inputValue.trim()}
                sx={{ alignSelf: 'flex-end' }}
              >
                Send
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default AiChatPage;
