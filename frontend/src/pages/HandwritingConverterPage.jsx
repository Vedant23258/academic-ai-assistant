import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import { Download, ContentCopy } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const FONTS = {
  casual: { name: 'Indie Flower', weight: '400' },
  script: { name: 'Caveat', weight: '700' },
  sketch: { name: 'Fredoka', weight: '400' },
  marker: { name: 'Markerfield', weight: '400' },
  handwrite: { name: 'Satisfy', weight: '400' }
};

const HandwritingConverterPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [text, setText] = useState('');
  const [font, setFont] = useState('casual');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const generateHandwriting = () => {
    if (!text.trim() || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fontStyle = FONTS[font];

    canvas.width = 800;
    canvas.height = Math.max(300, Math.ceil(text.split('\n').length * 50));

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333333';
    ctx.font = `${fontStyle.weight} 32px "${fontStyle.name}", cursive`;
    ctx.lineHeight = '1.6';

    const lines = text.split('\n');
    let y = 50;

    lines.forEach((line) => {
      ctx.fillText(line, 40, y);
      y += 50;
    });
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'handwriting.png';
    link.click();
  };

  const handleCopy = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      navigator.clipboard
        .write([
          new ClipboardItem({
            'image/png': blob
          })
        ])
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
    });
  };

  React.useEffect(() => {
    if (text.trim()) {
      generateHandwriting();
    }
  }, [text, font]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            ✍️ Text to Handwriting Converter
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Convert your text to beautiful handwritten style
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {/* Input Section */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Text Input
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={8}
                placeholder="Type your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Handwriting Style</InputLabel>
                <Select value={font} label="Handwriting Style" onChange={(e) => setFont(e.target.value)}>
                  <MenuItem value="casual">Casual (Indie Flower)</MenuItem>
                  <MenuItem value="script">Script (Caveat)</MenuItem>
                  <MenuItem value="sketch">Sketch (Fredoka)</MenuItem>
                  <MenuItem value="marker">Marker Style (Markerfield)</MenuItem>
                  <MenuItem value="handwrite">Elegant (Satisfy)</MenuItem>
                </Select>
              </FormControl>

              {copied && <Alert severity="success" sx={{ mb: 2 }}>Copied to clipboard!</Alert>}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" fullWidth startIcon={<Download />} onClick={handleDownload} disabled={!text.trim()}>
                  Download
                </Button>
                <Button variant="outlined" fullWidth startIcon={<ContentCopy />} onClick={handleCopy} disabled={!text.trim()}>
                  Copy
                </Button>
              </Box>
            </Paper>

            {/* Preview Section */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Preview
              </Typography>
              {text.trim() ? (
                <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, overflow: 'auto', maxHeight: '500px' }}>
                  <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              ) : (
                <Box sx={{ bgcolor: '#f5f5f5', p: 4, borderRadius: 1, textAlign: 'center', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">Your handwriting preview will appear here...</Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HandwritingConverterPage;
