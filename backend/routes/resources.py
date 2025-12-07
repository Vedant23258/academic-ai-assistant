from flask import Blueprint, request, jsonify
import requests

resources_bp = Blueprint('resources', __name__)

# Mock learning resources database
resources_db = {
    "python": [
        {"title": "Python Basics Tutorial", "type": "video", "url": "https://youtube.com", "difficulty": "Beginner"},
        {"title": "Advanced Python Concepts", "type": "article", "url": "https://medium.com", "difficulty": "Advanced"}
    ],
    "javascript": [
        {"title": "JS Fundamentals", "type": "video", "url": "https://youtube.com", "difficulty": "Beginner"},
        {"title": "React Mastery", "type": "course", "url": "https://udemy.com", "difficulty": "Intermediate"}
    ],
    "data structures": [
        {"title": "DSA Complete Guide", "type": "book", "url": "https://amazon.com", "difficulty": "Intermediate"},
        {"title": "LeetCode DSA Problems", "type": "practice", "url": "https://leetcode.com", "difficulty": "All"}
    ]
}

@resources_bp.route('/api/resources/search', methods=['POST'])
def search_resources():
    try:
        data = request.json
        topic = data.get('topic', '').lower()
        difficulty = data.get('difficulty', 'All')
        
        if not topic:
            return jsonify({"error": "Topic is required"}), 400
        
        # Search in database
        results = resources_db.get(topic, [])
        
        # Filter by difficulty if specified
        if difficulty != 'All':
            results = [r for r in results if r.get('difficulty') == difficulty or r.get('difficulty') == 'All']
        
        return jsonify({"resources": results, "topic": topic}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@resources_bp.route('/api/resources/recommend', methods=['POST'])
def get_recommendations():
    try:
        data = request.json
        topics = data.get('topics', [])
        
        if not topics:
            return jsonify({"error": "Topics are required"}), 400
        
        recommendations = []
        for topic in topics:
            topic_lower = topic.lower()
            if topic_lower in resources_db:
                recommendations.extend(resources_db[topic_lower][:2])
        
        return jsonify({"recommendations": recommendations}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
      
