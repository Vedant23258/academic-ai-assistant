import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Dashboard from "./pages/Dashboard";
import AiChatPage from "./pages/AiChatPage";
import SolverPage from "./pages/SolverPage";
import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DocumentGeneratorPage from "./pages/DocumentGeneratorPage";
import HandwritingConverterPage from "./pages/HandwritingConverterPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<AiChatPage />} />
        <Route path="/solver" element={<SolverPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
                  <Route path="/documents" element={<DocumentGeneratorPage />} />
          <Route path="/handwriting" element={<HandwritingConverterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
