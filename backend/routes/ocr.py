from flask import Blueprint, request, jsonify
import base64
import io
from PIL import Image
import pytesseract
import os

ocr_bp = Blueprint('ocr', __name__)

@ocr_bp.route('/api/ocr/convert', methods=['POST'])
def convert_handwriting():
    try:
        # Check if image file is in request
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Read and process image
        img = Image.open(io.BytesIO(file.read()))
        
        # Use Tesseract OCR to extract text
        text = pytesseract.image_to_string(img)
        
        if not text.strip():
            return jsonify({"error": "No text detected in image"}), 400
        
        return jsonify({"text": text.strip(), "success": True})
        
    except Exception as e:
        return jsonify({"error": f"OCR processing failed: {str(e)}"}), 500
