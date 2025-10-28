import React, { useState } from 'react';
import './MathSolver.css';

const MathSolver = () => {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = async () => {
    if (!problem.trim()) {
      setError('Please enter a math problem');
      return;
    }

    setLoading(true);
    setError('');
    setSolution(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/math/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ problem }),
      });

      const data = await response.json();

      if (response.ok) {
        setSolution(data.solution);
      } else {
        setError(data.message || 'Failed to solve the problem');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="math-solver">
      <div className="solver-header">
        <h2>🔢 Math Problem Solver</h2>
        <p>Enter your math problem and get instant solutions with step-by-step explanations</p>
      </div>
      <div className="solver-content">
        <div className="input-section">
          <label htmlFor="problem">Enter Math Problem:</label>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="e.g., Solve: 2x + 5 = 15"
            rows="4"
          />
          <button 
            onClick={handleSolve} 
            disabled={loading}
            className="solve-btn"
          >
            {loading ? 'Solving...' : 'Solve Problem'}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {solution && (
          <div className="solution-section">
            <h3>Solution:</h3>
            <div className="solution-content">
              <p><strong>Answer:</strong> {solution.answer}</p>
              {solution.steps && (
                <div className="steps">
                  <h4>Step-by-step Solution:</h4>
                  <ol>
                    {solution.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathSolver;
