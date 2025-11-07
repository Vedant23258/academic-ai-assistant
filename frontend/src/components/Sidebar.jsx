import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import { Home, Chat, Calculate, Note, Description, School } from '@mui/icons-material';
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
      <Box sx={{ width: 250 }} role="presentation">
        <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h6" fontWeight={600}>Academic AI</Typography>
          <Typography variant="caption">Your Study Assistant</Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => { navigate(item.path); onClose(); }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
