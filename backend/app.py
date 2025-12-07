from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')

# Initialize extensions
CORS(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Import routes
from routes.auth import auth_bp
from routes.ai_chat import ai_chat_bp
from routes.ocr import ocr_bp
from routes.solver import solver_bp
from routes.resources import resources_bp

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(ai_chat_bp)
app.register_blueprint(ocr_bp)
app.register_blueprint(solver_bp)
app.register_blueprint(resources_bp)

@app.route('/')
def home():
    return jsonify({
        'message': 'Welcome to Academic AI Assistant API',
        'version': '1.0.0',
        'endpoints': {
            'auth': '/api/auth',
            'chat': '/api/chat',
            'math': '/api/math/solve',
            'ocr': '/api/ocr/convert',
            'resources': '/api/resources',
        }
    })

@app.route('/api/health')
def health():
    return jsonify({'status': 'healthy', 'message': 'API is running'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
