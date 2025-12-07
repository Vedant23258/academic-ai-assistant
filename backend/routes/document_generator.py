from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os
from functools import wraps

# Initialize the blueprint
doc_generator_bp = Blueprint('document_generator', __name__, url_prefix='/api/document')

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY', ''))

def token_required(f):
    """Decorator to check if token is provided (optional for demo)"""
    @wraps(f)
    def decorated(*args, **kwargs):
        return f(*args, **kwargs)
    return decorated

@doc_generator_bp.route('/generate', methods=['POST'])
@token_required
def generate_document():
    """Generate academic documents using AI"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        document_type = data.get('documentType', 'essay')
        topic = data.get('topic', '').strip()
        length = data.get('length', 'medium')
        
        if not topic:
            return jsonify({'success': False, 'message': 'Topic is required'}), 400
        
        # Map length to word count
        word_counts = {
            'short': 500,
            'medium': 1000,
            'long': 2000
        }
        word_count = word_counts.get(length, 1000)
        
        # Create appropriate prompt based on document type
        prompts = {
            'essay': f"Write a comprehensive essay about '{topic}' with approximately {word_count} words. Include introduction, body paragraphs, and conclusion.",
            'report': f"Write a professional report about '{topic}' with approximately {word_count} words. Include executive summary, findings, and recommendations.",
            'research': f"Write a research paper about '{topic}' with approximately {word_count} words. Include abstract, introduction, methodology, findings, and conclusion.",
            'summary': f"Write a concise summary of '{topic}' with approximately {word_count} words. Make it informative and well-structured."
        }
        
        prompt = prompts.get(document_type, prompts['essay'])
        
        # Generate content using Gemini
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        
        if response and response.text:
            return jsonify({
                'success': True,
                'document': {
                    'content': response.text,
                    'type': document_type,
                    'topic': topic,
                    'length': length
                }
            }), 200
        else:
            return jsonify({'success': False, 'message': 'Failed to generate document'}), 500
    
    except Exception as e:
        print(f"Error in generate_document: {str(e)}")
        return jsonify({'success': False, 'message': str(e)}), 500

@doc_generator_bp.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'document_generator'}), 200
