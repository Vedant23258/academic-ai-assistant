import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <h1>Academic AI Assistant</h1>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
