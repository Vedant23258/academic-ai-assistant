import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Avatar, Alert, CircularProgress } from '@mui/material';
import { Calculate } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

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
        return `x = ${result.toFixed(2)}`;
      }
    }
    const result = eval(problem.replace(/\^/g, '**'));
    return `Result: ${result}`;
  } catch {
    return `Error: Invalid input`;
  }
};

const SolverPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSolve = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setSolution(null);
    
    setTimeout(() => {
      const result = solveMathProblem(problem);
      setSolution(result);
      setLoading(false);
    }, 500);
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
              Solve equations & calculate expressions
            </Typography>
            <Typography variant="caption" color="info.main" sx={{ mb: 3, display: 'block' }}>
              Examples: 5+3, 10*2, 2x+5=13, 2^3
            </Typography>

            <TextField
              fullWidth
              placeholder="e.g., 2x + 5 = 13 or 5 + 3"
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

            {solution && (
              <Paper sx={{ p: 3, bgcolor: 'success.light', mt: 2, textAlign: 'center', borderLeft: '4px solid green' }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: 'success.dark' }}>
                  ✓ {solution}
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
