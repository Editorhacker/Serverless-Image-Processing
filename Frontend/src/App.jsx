import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ImageDetails from './pages/ImageDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"                  element={<LandingPage />} />
        <Route path="/dashboard"         element={<Dashboard />} />
        <Route path="/details/:imageId"  element={<ImageDetails />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1e1e',
            color: '#f0ece4',
            border: '1px solid #2a2725',
            borderRadius: 10,
            fontSize: 13,
            fontFamily: 'DM Sans, sans-serif',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            padding: '12px 16px',
          },
          success: { iconTheme: { primary: '#d4a053', secondary: '#1e1e1e' } },
          error:   { iconTheme: { primary: '#c75050', secondary: '#1e1e1e' } },
        }}
      />
    </Router>
  );
}

export default App;
