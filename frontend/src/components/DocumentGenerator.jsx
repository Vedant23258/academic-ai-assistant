import React, { useState } from 'react';
import './DocumentGenerator.css';

const DocumentGenerator = () => {
  const [documentType, setDocumentType] = useState('essay');
  const [topic, setTopic] = useState('');
  const [length, setLength] = useState('medium');
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedDocument(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/document/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ documentType, topic, length }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedDocument(data.document);
      } else {
        setError(data.message || 'Failed to generate document');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
    <div className="document-generator">
      <div className="generator-header">
        <h2>📄 AI Document Generator</h2>
        <p>Generate academic documents with AI assistance</p>
      </div>
      <div className="generator-content">
        <div className="input-section">
          <div className="form-group">
            <label htmlFor="documentType">Document Type:</label>
            <select
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="essay">Essay</option>
              <option value="report">Report</option>
              <option value="research">Research Paper</option>
              <option value="summary">Summary</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter the topic or subject"
            />
          </div>
          <div className="form-group">
            <label htmlFor="length">Length:</label>
            <select
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <option value="short">Short (500 words)</option>
              <option value="medium">Medium (1000 words)</option>
              <option value="long">Long (2000+ words)</option>
            </select>
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="generate-btn"
          >
            {loading ? 'Generating...' : 'Generate Document'}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {generatedDocument && (
          <div className="document-section">
            <div className="document-header">
              <h3>Generated Document</h3>
              <button onClick={handleDownload} className="download-btn">
                📥 Download
              </button>
            </div>
            <div className="document-preview">
              <p>{generatedDocument.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentGenerator;
