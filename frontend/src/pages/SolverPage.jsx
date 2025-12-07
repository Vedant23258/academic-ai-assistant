import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Avatar, Alert, CircularProgress } from '@mui/material';
import { Calculate } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

// Client-side math solver
const solveMathProblem = (problem) => {
  try {
    if (problem.includes('=')) {
      const [left, right] = problem.split('=').map(s => s.trim());
      const coefMatch = left.match(/([+-]?\d*\.?\d*)\s*\*?\s*x/);
      if (coefMatch) {
        const coef = parseFloat(coefMatch[1]) || 1;
        const constMatch = left.match(/([+-]\s*\d+\.?\d*)(?!.*x)/);
        const constant = constMatch ? parseFloat(constMatch[1]) : 0;
        const result = (eval(right) - constant) / coef;
        return `Solution: x = ${result.toFixed(2)}`;
      }
    }
    const sanitized = problem.replace(/\^/g, '**');
    const result = eval(sanitized);
    return `Result: ${result}`;
  } catch (err) {
    return `Error: Could not solve "${problem}". Try: 2+2, 5*3, 2x+5=13`;
  }
};

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
      let result = null;
      const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // Try backend with 3 second timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(`${backendURL}/api/math/solve`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problem }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          result = data.solution || data;
        } else {
          throw new Error('Backend error');
        }
      } catch (backendErr) {
        // Fallback to client-side solver
        console.log('Using client solver');
        result = solveMathProblem(problem);
      }
      
      setSolution(result);
    } catch (err) {
      setError('Error: ' + err.message);
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
            <Typography variant="h4" gutterBottom fontWeight={600}>
              Math Solver
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Solve equations, calculate expressions, and simplify math
            </Typography>
            <Typography variant="caption" color="info.main" sx={{ mb: 3, display: 'block' }}>
              Examples: 2+3, 5*6, 2x+5=13, 2^3
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter math problem (e.g., 2x + 5 = 13 or 2 + 2 * 3)"
              sx={{ mb: 2 }}
              multiline
              rows={3}
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
              {loading ? <CircularProgress size={24} /> : 'Solve'}
            </Button>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {solution && (
              <Paper sx={{ p: 3, bgcolor: 'success.light', mt: 2, textAlign: 'left', borderLeft: '4px solid green' }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: 'success.dark' }}>✓ Solution:</Typography>
                <Typography sx={{ mt: 2, fontFamily: 'monospace', fontSize: '1.1em' }}>
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
