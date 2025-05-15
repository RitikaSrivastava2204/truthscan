import React, { useState } from 'react';
import './StartDetecting.css';

const SERVICES = [
  {
    id: 'text',
    name: 'Text Detection',
    description: 'Check Text Plagiarism and AI detection',
    icon: '📝',
  },
  {
    id: 'image',
    name: 'Image Detection',
    description: 'Detect Deepfake images',
    icon: '🖼️',
  },
  {
    id: 'code',
    name: 'Code Detection',
    description: 'Analyze code for plagiarism and AI content',
    icon: '💻',
  },
];

const StartDetecting = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [inputData, setInputData] = useState('');
  const [detectionMode, setDetectionMode] = useState('basic'); // NEW
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setStep(2);
    setInputData('');
    setResult(null);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedService(null);
    setInputData('');
    setResult(null);
    setDetectionMode('basic'); // Reset mode on back
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleStartDetection = async () => {
    if (selectedService === 'image') {
      alert('Image detection not implemented yet.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputData,
          mode: detectionMode, // Send mode
        }),
      });

      const data = await response.json();
      setResult(data);
      setStep(3);
    } catch (error) {
      console.error('Error during detection:', error);
      alert('Something went wrong during detection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wizard-container">
      <h2 className="wizard-title">Start Detection</h2>

      <div className="progress-bar">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`step-indicator ${step >= num ? 'active' : ''}`}
            title={`Step ${num}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="service-options">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => handleServiceSelect(service.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleServiceSelect(service.id)}
            >
              <div className="service-icon">{service.icon}</div>
              <h4>{service.name}</h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="input-section">
          <label htmlFor="detectionInput">
            {selectedService === 'text' && 'Enter the text to analyze:'}
            {selectedService === 'image' && 'Upload an image file:'}
            {selectedService === 'code' && 'Paste your code snippet:'}
          </label>

          {selectedService === 'image' ? (
            <input
              id="detectionInput"
              type="file"
              accept="image/*"
              onChange={(e) => setInputData(e.target.files[0])}
            />
          ) : (
            <textarea
              id="detectionInput"
              rows={selectedService === 'code' ? 8 : 6}
              placeholder={
                selectedService === 'text'
                  ? 'Type or paste your text here...'
                  : 'Paste your code here...'
              }
              value={inputData}
              onChange={handleInputChange}
            />
          )}

          {/* Mode toggle for text detection */}
          {selectedService === 'text' && (
            <div className="mode-toggle">
              <p><strong>Choose Detection Mode:</strong></p>
              <label>
                <input
                  type="radio"
                  value="basic"
                  checked={detectionMode === 'basic'}
                  onChange={() => setDetectionMode('basic')}
                />
                Basic Check (Custom Algorithm)
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="api"
                  checked={detectionMode === 'api'}
                  onChange={() => setDetectionMode('api')}
                />
                Deep Check (API-based)
              </label>
            </div>
          )}

          <div>
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
            <button
              className="start-btn"
              onClick={handleStartDetection}
              disabled={!inputData || (selectedService === 'image' && !inputData.name)}
            >
              {loading ? 'Detecting...' : 'Start Detection'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="result-section">
          <h3>Detection Result</h3>
          {result ? (
            <>
              <p><strong>Received:</strong> {result.receivedText}</p>
              <p><strong>Plagiarism Score:</strong> {result.plagiarismScore}%</p>
            </>
          ) : (
            <p>No result to show.</p>
          )}
          <button className="back-btn" onClick={() => setStep(1)}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default StartDetecting;
