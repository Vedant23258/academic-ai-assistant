import React, { useState } from 'react';
Grid, import { Box, Container, TextField, IconButton, Typography, Paper, Avatar, Fade } from '@mui/material';
import { Send, AutoAwesome, LightMode, DarkMode } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: 'I am your Academic AI Assistant! How can I help you with your studies today?', 
          sender: 'ai' 
        }]);
      }, 1000);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f0f0f' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 3 }}>
          {messages.length === 0 ? (
           {/* Feature Showcase */}
     <Grid container spacing={2} sx={{ mb: 4 }}>
       {[
         { icon: '🤖', title: 'AI Chat', desc: 'Ask questions, get instant answers' },
         { icon: '🔢', title: 'Math Solver', desc: 'Solve complex math problems' },
         { icon: '📝', title: 'Document Generator', desc: 'Create essays & reports' },
         { icon: '✍️', title: 'Handwriting Converter', desc: 'Text to beautiful handwriting' },
       ].map((feature, i) => (
         <Grid item xs={12} sm={6} md={3} key={i}>
           <Paper sx={{
             p: 2,
             textAlign: 'center',
             background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
             border: '1px solid rgba(102, 126, 234, 0.2)',
             borderRadius: 2,
             transition: 'all 0.3s ease',
             cursor: 'pointer',
             '&:hover': {
               transform: 'translateY(-4px)',
               boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
               borderColor: 'rgba(102, 126, 234, 0.5)',
             }
           }}>
             <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>{feature.icon}</Typography>
             <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{feature.title}</Typography>
             <Typography variant="caption" sx={{ color: 'text.secondary' }}>{feature.desc}</Typography>
           </Paper>
         </Grid>
       ))}
     </Grid>

            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <Fade in timeout={1000}>
                <Box>
                  <Avatar sx={{ 
                    width: 100, 
                    height: 100, 
                    margin: '0 auto 24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)'
                  }}>
                    <AutoAwesome sx={{ fontSize: 50 }} />
                  </Avatar>
                  
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Ask Me Anything
                  </Typography>
                  
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
                    Your intelligent academic companion powered by AI. Ask questions, solve problems, get instant help.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[
                      'Solve this math problem',
                      'Explain quantum physics',
                      'Write an essay outline',
                      'Help with chemistry'
                    ].map((suggestion, i) => (
                      <Paper key={i} sx={{
                        px: 3,
                        py: 1.5,
                        cursor: 'pointer',
                        bgcolor: 'rgba(102, 126, 234, 0.1)',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          bgcolor: 'rgba(102, 126, 234, 0.2)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                        }
                      }}
                      onClick={() => setMessage(suggestion)}>
                        <Typography variant="body2" color="primary">{suggestion}</Typography>
                      </Paper>
                    ))}
                  </Box>
                </Box>
              </Fade>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
              {messages.map((msg, i) => (
                <Fade in key={i} timeout={500}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}>
                    <Paper sx={{
                      p: 2,
                      maxWidth: '70%',
                      bgcolor: msg.sender === 'user' ? 'primary.main' : 'background.paper',
                      color: msg.sender === 'user' ? 'white' : 'text.primary'
                    }}>
                      <Typography>{msg.text}</Typography>
                    </Paper>
                  </Box>
                </Fade>
              ))}
            </Box>
          )}
          
          <Paper sx={{
            p: 2,
            display: 'flex',
            gap: 1,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
          }}>
            <TextField
              fullWidth
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ '& input': { fontSize: '1.1rem' } }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSend}
              disabled={!message.trim()}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
                '&:disabled': { bgcolor: 'action.disabledBackground' }
              }}
            >
              <Send />
            </IconButton>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
