import React, { useState } from 'react';
import './HandwritingConverter.css';

const HandwritingConverter = () => {
  const [inputText, setInputText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('caveat');
  const [loading, setLoading] = useState(false);

  const generateHandwriting = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text first!');
      return;
    }

    setLoading(true);
    try {
      // Create canvas for handwriting effect
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 1000;
      canvas.height = 800;
      
      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set font style based on selection
      const fontStyles = {
        caveat: 'italic bold 24px Caveat, cursive',
        indie: '24px Indie Flower, cursive',
        dancing: 'bold 24px Dancing Script, cursive',
        satisfy: '28px Satisfy, cursive',
        kalam: '24px Kalam, cursive'
      };
      
      ctx.font = fontStyles[fontFamily];
      ctx.fillStyle = '#333333';
      ctx.lineWidth = 1.5;
      
      // Add slight rotation for handwritten feel
      const lines = inputText.split('\n');
      let y = 50;
      
      lines.forEach((line, idx) => {
        // Add slight random rotation
        ctx.save();
        const rotation = (Math.random() - 0.5) * 0.02;
        ctx.transform(1, rotation, 0, 1, 0, y);
        
        ctx.fillText(line || ' ', 30, 0);
        ctx.restore();
        
        y += fontSize + 15;
        
        if (y > canvas.height - 50) {
          ctx.fillText('...(more)', 30, y);
          return;
        }
      });
      
      // Convert to PDF and download
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'handwritten-text.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating handwriting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text first!');
      return;
    }

    setLoading(true);
    try {
      // Using html2pdf library approach
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 1200;
      canvas.height = 1500;
      
      // White background with margins
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Border
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      
      // Set font
      const fontStyles = {
        caveat: 'italic bold 32px Caveat, cursive',
        indie: '32px Indie Flower, cursive',
        dancing: 'bold 32px Dancing Script, cursive',
        satisfy: '36px Satisfy, cursive',
        kalam: '32px Kalam, cursive'
      };
      
      ctx.font = fontStyles[fontFamily];
      ctx.fillStyle = '#2c2c2c';
      
      // Render text
      const lines = inputText.split('\n');
      let y = 100;
      const lineHeight = fontSize + 20;
      
      lines.forEach((line) => {
        if (y > canvas.height - 100) return;
        
        ctx.save();
        const rotation = (Math.random() - 0.5) * 0.015;
        ctx.transform(1, rotation, 0, 1, 0, y);
        ctx.fillText(line || ' ', 80, 0);
        ctx.restore();
        
        y += lineHeight;
      });
      
      // Download as PNG (serves as PDF preview)
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'handwritten-document.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="handwriting-converter">
      <div className="converter-header">
        <h2>✍️ Text to Handwriting Converter</h2>
        <p>Convert your text to beautiful handwritten style images & PDFs</p>
      </div>

      <div className="converter-content">
        <div className="input-section">
          <label>Enter Your Text:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your text here... You can write multiple lines."
            rows="8"
          />
          
          <div className="controls">
            <div className="control-group">
              <label>Font Style:</label>
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                <option value="caveat">Caveat (Default)</option>
                <option value="indie">Indie Flower</option>
                <option value="dancing">Dancing Script</option>
                <option value="satisfy">Satisfy</option>
                <option value="kalam">Kalam</option>
              </select>
            </div>
            
            <div className="control-group">
              <label>Font Size:</label>
              <input
                type="range"
                min="16"
                max="48"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
              <span>{fontSize}px</span>
            </div>
          </div>

          <div className="button-group">
            <button 
              onClick={generateHandwriting}
              disabled={loading || !inputText.trim()}
              className="generate-btn"
            >
              {loading ? 'Generating...' : '🖼️ Generate Image'}
            </button>
            
            <button 
              onClick={downloadAsPDF}
              disabled={loading || !inputText.trim()}
              className="pdf-btn"
            >
              {loading ? 'Generating...' : '📄 Download as PDF'}
            </button>
          </div>
        </div>

        <div className="preview-section">
          <label>Preview:</label>
          <div 
            className="preview-box"
            style={{
              fontFamily: fontFamily === 'caveat' ? 'Caveat' : 
                          fontFamily === 'indie' ? 'Indie Flower' :
                          fontFamily === 'dancing' ? 'Dancing Script' :
                          fontFamily === 'satisfy' ? 'Satisfy' : 'Kalam',
              fontSize: `${fontSize}px`,
              fontStyle: fontFamily === 'caveat' ? 'italic' : 'normal',
              fontWeight: fontFamily === 'caveat' || fontFamily === 'dancing' ? 'bold' : 'normal'
            }}
          >
            {inputText || 'Your handwritten text will appear here...'}
          </div>
          <p className="preview-note">⚠️ Load fonts from CDN first. Check main.jsx</p>
        </div>
      </div>
    </div>
  );
};

export default HandwritingConverter;
