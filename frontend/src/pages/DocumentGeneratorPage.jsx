import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { Download, Description } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DocumentGeneratorPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [documentType, setDocumentType] = useState('essay');
  const [topic, setTopic] = useState('');
  const [length, setLength] = useState('medium');
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedDocument(null);

    try {
      const response = await fetch(`${backendURL}/api/document/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType,
          topic,
          length
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.document) {
        setGeneratedDocument(data.document);
      } else {
        setError(data.message || 'Failed to generate document');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate document. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedDocument) return;

    const blob = new Blob([generatedDocument.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '_')}_${documentType}.txt`;
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
              <Description sx={{ fontSize: 32, color: 'primary.main' }} />
              AI Document Generator
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Generate high-quality academic documents in seconds using AI
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Input Section */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Document Configuration
                </Typography>

                <Box component="form" onSubmit={handleGenerate} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Document Type</InputLabel>
                    <Select
                      value={documentType}
                      label="Document Type"
                      onChange={(e) => setDocumentType(e.target.value)}
                    >
                      <MenuItem value="essay">Essay</MenuItem>
                      <MenuItem value="report">Report</MenuItem>
                      <MenuItem value="research">Research Paper</MenuItem>
                      <MenuItem value="summary">Summary</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter the topic or subject"
                    multiline
                    rows={3}
                  />

                  <FormControl fullWidth>
                    <InputLabel>Length</InputLabel>
                    <Select
                      value={length}
                      label="Length"
                      onChange={(e) => setLength(e.target.value)}
                    >
                      <MenuItem value="short">Short (500 words)</MenuItem>
                      <MenuItem value="medium">Medium (1000 words)</MenuItem>
                      <MenuItem value="long">Long (2000+ words)</MenuItem>
                    </Select>
                  </FormControl>

                  {error && <Alert severity="error">{error}</Alert>}

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                    sx={{ mt: 2 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Generate Document'}
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Generated Document Section */}
            <Grid item xs={12} md={8}>
              {generatedDocument ? (
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Generated {documentType.charAt(0).toUpperCase() + documentType.slice(1)}
                    </Typography>
                    <Button
                      variant="contained"
                      endIcon={<Download />}
                      onClick={handleDownload}
                      size="small"
                    >
                      Download
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      maxHeight: '600px',
                      overflowY: 'auto',
                      bgcolor: '#f5f5f5',
                      p: 2,
                      borderRadius: 1,
                      lineHeight: 1.8,
                      fontSize: '0.95rem'
                    }}
                  >
                    {generatedDocument.content.split('\n').map((paragraph, idx) => (
                      <Typography key={idx} sx={{ mb: 2 }}>
                        {paragraph}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              ) : (
                <Card sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)', border: '2px dashed', borderColor: 'primary.main' }}>
                  <CardContent sx={{ textAlign: 'center', py: 8 }}>
                    <Description sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      {loading ? 'Generating your document...' : 'Generated document will appear here'}
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

export default DocumentGeneratorPage;
