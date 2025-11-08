import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Divider, Avatar } from '@mui/material';
import { Home, Chat, Calculate, Note, Description, School, AutoAwesome } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { label: 'Dashboard', icon: <Home />, path: '/' },
    { label: 'AI Chat', icon: <Chat />, path: '/chat' },
    { label: 'Math Solver', icon: <Calculate />, path: '/solver' },
    { label: 'Notes', icon: <Note />, path: '/notes' },
    { label: 'Documents', icon: <Description />, path: '/documents' },
    { label: 'Courses', icon: <School />, path: '/courses' },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ 
        width: 250, 
        height: '100%',
        bgcolor: '#0a0a0a',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a2e 100%)',
      }} role="presentation">
        
        <Box sx={{ 
          p: 3, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent)',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
            <Avatar sx={{
              width: 50,
              height: 50,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            }}>
              <AutoAwesome sx={{ fontSize: 30 }} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ 
                color: 'white',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0e6ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Academic AI
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                Your Study Assistant
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(139, 125, 216, 0.2)' }} />
        
        <List sx={{ pt: 2 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ px: 1, mb: 0.5 }}>
              <ListItemButton 
                onClick={() => { navigate(item.path); onClose(); }}
                sx={{
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(139, 125, 216, 0.15)',
                    transform: 'translateX(8px)',
                    '& .MuiListItemIcon-root': {
                      color: '#8B7DD8',
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: '#b0b0b0',
                  minWidth: 45,
                  transition: 'all 0.3s ease',
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: '#ffffff',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
