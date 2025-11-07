import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Topbar = ({ onMenuClick }) => {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Academic AI Assistant
        </Typography>
        <Box>
          <Typography variant="body2">Powered by AI</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
