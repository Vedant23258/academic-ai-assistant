from flask import Blueprint, request, jsonify
import sympy as sp
import os

solver_bp = Blueprint('solver', __name__)

@solver_bp.route('/api/math/solve', methods=['POST'])
def solve_math_problem():
    try:
        data = request.json
        problem = data.get('problem')
        
        if not problem:
            return jsonify({"error": "Problem required"}), 400
        
        try:
            # Try to solve as equation
            if '=' in problem:
                parts = problem.split('=')
                if len(parts) == 2:
                    x = sp.Symbol('x')
                    eq = sp.Eq(sp.sympify(parts[0]), sp.sympify(parts[1]))
                    solutions = sp.solve(eq, x)
                    return jsonify({"solution": str(solutions), "steps": "Equation solved"})
            
            # Try to evaluate expression
            result = sp.sympify(problem)
            simplified = sp.simplify(result)
            return jsonify({"solution": str(simplified), "original": str(result)})
            
        except Exception as e:
            return jsonify({"error": f"Could not parse: {str(e)}"}), 400
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
