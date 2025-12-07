import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { CloudUpload, ContentCopy, Download } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const HandwritingConverterPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedText, setConvertedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
        setConvertedText('');
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${backendURL}/api/ocr/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: selectedImage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.text) {
        setConvertedText(data.text);
      } else {
        setError(data.message || 'Failed to convert handwriting');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to convert handwriting. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!convertedText) return;

    const blob = new Blob([convertedText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'handwriting_converted.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              ✍️ Handwriting Converter
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Convert handwritten text from images to digital text using OCR
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Upload Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Select Image
                </Typography>

                <Box
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: 'rgba(25, 118, 210, 0.05)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: 'rgba(25, 118, 210, 0.1)',
                      borderColor: 'primary.dark'
                    }
                  }}
                >
                  <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {selectedImage ? 'Change Image' : 'Click to select an image'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    JPG, PNG or GIF - Max 10MB
                  </Typography>
                </Box>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />

                {selectedImage && (
                  <Box sx={{ mt: 3 }}>
                    <img
                      src={selectedImage}
                      alt="Selected"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '300px',
                        borderRadius: '8px',
                        marginBottom: '16px'
                      }}
                    />
                  </Box>
                )}

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleConvert}
                  disabled={loading || !selectedImage}
                  sx={{ mt: 3 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Convert Handwriting'}
                </Button>
              </Paper>
            </Grid>

            {/* Result Section */}
            <Grid item xs={12} md={6}>
              {convertedText ? (
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Converted Text
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={handleCopy}
                        title={copied ? 'Copied!' : 'Copy'}
                      >
                        <ContentCopy />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={handleDownload}
                        title="Download"
                      >
                        <Download />
                      </IconButton>
                    </Box>
                  </Box>

                  {copied && <Alert severity="success" sx={{ mb: 2 }}>Copied to clipboard!</Alert>}

                  <Box
                    sx={{
                      bgcolor: '#f5f5f5',
                      p: 2,
                      borderRadius: 1,
                      minHeight: '300px',
                      maxHeight: '400px',
                      overflowY: 'auto',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      lineHeight: 1.6
                    }}
                  >
                    {convertedText}
                  </Box>
                </Paper>
              ) : (
                <Card sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)', border: '2px dashed', borderColor: 'primary.main', height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      {loading ? 'Converting handwriting...' : 'Converted text will appear here'}
                    </Typography>
                    {loading && <CircularProgress sx={{ mt: 3 }} />}
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HandwritingConverterPage;
