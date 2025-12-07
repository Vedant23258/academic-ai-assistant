from flask import Blueprint, request, jsonify
import openai
import os

ai_chat_bp = Blueprint('ai_chat', __name__)

# Dosti-style prompt for GPT responses
system_prompt = (
    "Tu ek mast college dost hai. User kuch bhi puche, tu bada friendly, funny, relatable jawab de. "
    "Har answer thoda mazaak bhara, casual aur helpful ho. Jaise asli life mein dost reply kare waise! "
    "Kabhi bhi rude ya boring jawab mat dena, hamesha chill aur yaarana mood bana ke rakh."
)

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

@ai_chat_bp.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
            conversation_history = data.get('conversationHistory', [])
        if not user_message:
            return jsonify({"error": "Message required"}), 400

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],messages = [{"role": "system", "content": system_prompt}] + conversation_history + [{"role": "user", "content": user_message}]
            max_tokens=250,
            temperature=0.9
        )
        ai_reply = response.choices[0].message['content'].strip()
        return jsonify({"reply": ai_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
