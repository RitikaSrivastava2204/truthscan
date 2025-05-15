import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header'; // Import Header component
import Features from './components/Features'; // Import Features component
import Home from './pages/Home'; // Import Home page component
import Login from './pages/Login'; // Import Login page (create this next)
import StartDetecting from './pages/StartDetecting'; 

function App() {
  return (
    <Router>
      <Header /> {/* Display Header component */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/features" element={<Features />} /> {/* Features page route */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/start-detecting" element={<StartDetecting />} /> {/* StartDetecting page route */}
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;

