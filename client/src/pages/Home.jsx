import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to TruthScan</h1>
        <p>Uncover the truth behind the content. Fast. Reliable. AI-powered.</p>
        <button className="cta-btn">Try It Now</button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="card">AI Plagiarism Detection</div>
          <div className="card">Code Similarity Checker</div>
          <div className="card">Fast Results</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Upload your file or paste text/code</li>
          <li>Click "Scan"</li>
          <li>Get instant analysis and report</li>
        </ol>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <h3>Start scanning your content today</h3>
        <button className="cta-btn">Get Started</button>
      </section>
    </div>
  );
}

export default Home;
