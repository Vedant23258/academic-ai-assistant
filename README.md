# 🎓 Academic AI Assistant

> AI-powered academic assistant for college students with advanced math solver, PDF/PPT creator, handwriting converter, and comprehensive study tools

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.2-lightgrey)](https://flask.palletsprojects.com/)

## ✨ Features

### 📊 Advanced Math Solver
- B.Tech/Engineering level mathematics support
- Multivariable calculus, differential equations, linear algebra
- Step-by-step solutions with detailed explanations
- Image/photo upload for handwritten problems (OCR)
- Interactive 2D/3D graphing and visualization
- LaTeX support for mathematical expressions

### 📄 Document Creation
- **PDF Generator**: Create professional academic documents
- **PPT Maker**: Generate presentations with multiple templates
- Export solutions and study materials

### ✍️ Text to Handwriting Converter
- 15+ realistic handwriting fonts
- Customizable pen colors and paper styles
- Natural variations for authentic look
- Perfect for assignments

### 📚 Study Tools
- Assignment tracker with deadline management
- Note organizer with categories
- Citation generator (APA, MLA, Chicago)
- Flashcards and quiz generator
- Pomodoro timer for productivity

## 🚀 Tech Stack

**Frontend:**
- React 18.2 with Vite
- Material-UI for modern interface
- Chart.js for visualizations
- jsPDF & pptxgenjs for document generation

**Backend:**
- Python Flask REST API
- SymPy for advanced mathematics
- NumPy, SciPy for scientific computing
- Tesseract OCR for image text recognition
- OpenAI integration for AI features

## 📁 Project Structure

```
academic-ai-assistant/
├── frontend/          # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Flask backend API
│   ├── app.py
│   ├── routes/
│   ├── models/
│   └── requirements.txt
├── docs/              # Documentation
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16+)
- Python (3.8+)
- Git

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Vedant23258/academic-ai-assistant.git
cd academic-ai-assistant
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

3. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

4. **Environment Variables**
Create `.env` file in backend folder:
```
FLASK_APP=app.py
FLASK_ENV=development
OPENAI_API_KEY=your_api_key_here
```

## 💻 Usage

1. Start the backend server (runs on `http://localhost:5000`)
2. Start the frontend dev server (runs on `http://localhost:5173`)
3. Open your browser and navigate to `http://localhost:5173`
4. Start using the features!

## 🎯 Roadmap

- [ ] Complete frontend UI components
- [ ] Implement backend API endpoints
- [ ] Integrate math solver engine
- [ ] Add OCR functionality
- [ ] Deploy to production
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vedant Patel**
- GitHub: [@Vedant23258](https://github.com/Vedant23258)

## 🙏 Acknowledgments

- Inspired by the needs of college students
- Built with modern web technologies
- Designed for academic excellence

---

⭐ Star this repo if you find it helpful!
