import React, { useState, useRef } from 'react';
import './HandwritingConverter.css';

const HandwritingConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [convertedText, setConvertedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      setSelectedFile(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');
    setConvertedText('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('http://localhost:5000/api/ocr/convert', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setConvertedText(data.text);
      } else {
        setError(data.message || 'Failed to convert handwriting');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (convertedText) {
      navigator.clipboard.writeText(convertedText);
      alert('Text copied to clipboard!');
    }
  };

  return (
    <div className="handwriting-converter">
      <div className="converter-header">
        <h2>✍️ Handwriting to Text Converter</h2>
        <p>Upload an image of handwritten text and convert it to digital text</p>
      </div>
      <div className="converter-content">
        <div className="upload-section">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button 
            className="upload-btn" 
            onClick={() => fileInputRef.current.click()}
          >
            📁 Select Image
          </button>
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
              <p>{selectedFile.name}</p>
            </div>
          )}
          <button 
            onClick={handleConvert} 
            disabled={!selectedFile || loading}
            className="convert-btn"
          >
            {loading ? 'Converting...' : 'Convert to Text'}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {convertedText && (
          <div className="result-section">
            <div className="result-header">
              <h3>Converted Text</h3>
              <button onClick={handleCopy} className="copy-btn">
                📋 Copy
              </button>
            </div>
            <div className="text-content">
              <p>{convertedText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandwritingConverter;
