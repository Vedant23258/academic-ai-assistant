import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Avatar, Alert, CircularProgress } from '@mui/material';
import { Calculate } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const SolverPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = async () => {
    if (!problem.trim()) {
      setError('Please enter a math problem');
      return;
    }

    setLoading(true);
    setError('');
    setSolution(null);

    try {
      const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${backendURL}/api/math/solve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem })
      });

      const data = await response.json();
      if (response.ok) {
        setSolution(data.solution || data);
      } else {
        setError(data.error || 'Failed to solve problem');
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

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
            
            <TextField 
              fullWidth 
              placeholder="Enter your math problem (e.g., solve 2x + 5 = 13 or simplify x^2 + 2x + 1)..." 
              sx={{ mb: 2 }} 
              multiline 
              rows={4}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              disabled={loading}
            />
            <Button 
              variant="contained" 
              color="success" 
              size="large"
              onClick={handleSolve}
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Solve Problem'}
            </Button>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            {solution && (
              <Paper sx={{ p: 2, bgcolor: 'success.light', mt: 2, textAlign: 'left' }}>
                <Typography variant="h6" fontWeight={600}>Solution:</Typography>
                <Typography sx={{ mt: 1, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  {typeof solution === 'string' ? solution : JSON.stringify(solution, null, 2)}
                </Typography>
              </Paper>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default SolverPage;
