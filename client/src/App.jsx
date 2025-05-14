import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import Header component
import Features from './components/Features'; // Import Features component
import Home from './pages/Home'; // Import Home page component

function App() {
  return (
    <Router>
      <Header /> {/* Display Header component */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/features" element={<Features />} /> {/* Features page route */}
        {/* Add more routes as you build the app */}
      </Routes>
    </Router>
  );
}

export default App;


