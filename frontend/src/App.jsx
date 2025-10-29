import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Dashboard from "./pages/Dashboard";
// Optionally import other pages, e.g.:
// import LoginPage from './pages/LoginPage';
// import MathSolver from './pages/MathSolver';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          {/* Topbar, Sidebar add karna ho toh yahan include kar sakte ho */}
          <Routes>
            {/* Home route par Dashboard render hoga */}
            <Route path="/" element={<Dashboard />} />
            {/* Add more routes as you develop */}
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/math" element={<MathSolver />} /> */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
