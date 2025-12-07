import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Avatar, Alert, CircularProgress } from '@mui/material';
import { Calculate } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

// Simple math solver - handles basic equations
const solveMathProblem = (problem) => {
  try {
    // Handle equation solving (e.g., "2x + 5 = 13")
    if (problem.includes('=')) {
      const [left, right] = problem.split('=').map(s => s.trim());
      
      // Solve linear equations like "2x + 5 = 13"
      const xMatch = left.match(/([+-]?\d*\.?\d*)\s*\*?\s*x\s*([+-]\s*\d+)?/);
      if (xMatch) {
        const leftSide = problem.substring(0, problem.indexOf('='));
        const rightSide = problem.substring(problem.indexOf('=') + 1);
        
        try {
          // Try to solve using Function evaluation
          // For equations like "2*x + 5 = 13"
          const solution = eval(`(${leftSide.replace(/x/g, '(')} x )}` === eval(`(${rightSide})`) ? 'x' : 'x');
          
          // Simple linear equation solver
          const coefMatch = leftSide.match(/([+-]?\d*\.?\d*)\s*\*?\s*x/);
          if (coefMatch) {
            const coef = parseFloat(coefMatch[1]) || 1;
            const constMatch = leftSide.match(/([+-]\s*\d+\.?\d*)(?!.*x)/);
            const constant = constMatch ? parseFloat(constMatch[1]) : 0;
            const result = (eval(rightSide) - constant) / coef;
            return `Solution: x = ${result.toFixed(2)}`;
          }
        } catch (e) {
          // Fallback for other equations
          return `Try simpler equation format. Example: 2*x + 5 = 13`;
        }
      }
    }
    
    // Handle expressions (e.g., "2 + 2", "5 * 6")
    const sanitized = problem.replace(/\^/g, '**'); // Convert ^ to **
    const result = eval(sanitized);
    return `Result: ${result}`;
  } catch (err) {
    return `Error: Could not solve "${problem}". Try: simple math expressions or linear equations like "2x + 5 = 13"`;
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
      const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      try {
        // Try backend first
        const response = await fetch(`${backendURL}/api/math/solve`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problem })
        });
        
        if (response.ok) {
          const data = await response.json();
          setSolution(data.solution || data);
        } else {
          throw new Error('Backend unavailable');
        }
      } catch (backendErr) {
        // Fallback to client-side solver
        console.log('Backend unavailable, using client solver');
        const clientSolution = solveMathProblem(problem);
        setSolution(clientSolution);
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSolve();
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
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Solve equations, simplify expressions, or calculate results
            </Typography>
            <Typography variant="caption" color="info.main" sx={{ mb: 3, display: 'block' }}>
              ✓ Equations: 2x + 5 = 13 | ✓ Expressions: 5 * (3 + 2) | ✓ Powers: 2^3 or 2**3
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter your math problem (e.g., solve 2x + 5 = 13 or calculate 5 * (3 + 2))"
              sx={{ mb: 2 }}
              multiline
              rows={4}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              onKeyPress={handleKeyPress}
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
              <Paper sx={{ p: 3, bgcolor: 'success.light', mt: 2, textAlign: 'left', borderLeft: '4px solid green' }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: 'success.dark' }}>
                  ✓ Solution:
                </Typography>
                <Typography sx={{ mt: 2, fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '1.1em' }}>
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
