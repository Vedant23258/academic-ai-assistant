from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt
import os

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# Mock user database (replace with real database)
users_db = {}

@auth_bp.route('/api/auth/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        
        if not email or not password or not name:
            return jsonify({"error": "Email, password, and name are required"}), 400
        
        if email in users_db:
            return jsonify({"error": "Email already registered"}), 409
        
        # Hash password and store user
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        users_db[email] = {"name": name, "password": hashed_password}
        
        # Create token
        access_token = create_access_token(identity=email)
        return jsonify({"token": access_token, "user": {"email": email, "name": name}}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({"error": "Email and password required"}), 400
        
        if email not in users_db:
            return jsonify({"error": "Invalid credentials"}), 401
        
        user = users_db[email]
        if not bcrypt.check_password_hash(user['password'], password):
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Create token
        access_token = create_access_token(identity=email)
        return jsonify({"token": access_token, "user": {"email": email, "name": user['name']}}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
