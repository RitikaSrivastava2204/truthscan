// src/components/Features.js
import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">Key Features</h2>
      <p className="features-subtitle">The Ultimate Content Verification Platform</p>

      <div className="features-container">
        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>Text Plagiarism & AI Detector</h3>
          <p>AI-powered text plagiarism detection using GPTZero or a custom classifier with GPT-2. Run similarity checks via DiffMatchPatch, Google Search API, or PlagiarismCheck.org.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💻</div>
          <h3>Image Deepfake Detection</h3>
          <p>Detect manipulated content with deepfake detection tools and Error Level Analysis (ELA) using OpenCV. Also, run metadata checks (EXIF) to uncover hidden details.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔧</div>
          <h3>Code Plagiarism Detection</h3>
          <p>Using MOSS from Stanford and GitHub API, detect copied code and ensure academic integrity by comparing submissions with online repositories.</p>
        </div>
      </div>

      <div className="cta-button">
        <a href="/start" className="cta-link">Start Detecting Now</a>
      </div>
    </section>
  );
};

export default Features;
