// src/pages/StartDetecting.jsx
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
  const [imageFile, setImageFile] = useState(null);
  const [detectionMode, setDetectionMode] = useState('basic');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setStep(2);
    setInputData('');
    setImageFile(null);
    setResult(null);
    setErrorMsg('');
  };

  const handleBack = () => {
    setStep(1);
    setSelectedService(null);
    setInputData('');
    setImageFile(null);
    setResult(null);
    setDetectionMode('basic');
    setErrorMsg('');
  };

  const handleStartDetection = async () => {
    if ((selectedService !== 'image' && !inputData.trim()) || (selectedService === 'image' && !imageFile)) {
      setErrorMsg('Input cannot be empty.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      let response;

      if (selectedService === 'image') {
        const formData = new FormData();
        formData.append('image', imageFile);

        response = await fetch('http://localhost:8080/detect/image', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('http://localhost:8080/detect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: inputData,
            mode: detectionMode,
            type: selectedService,
          }),
        });
      }

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setStep(3);
      } else {
        const errorText = data?.message || data?.error || 'Detection failed. Please try again.';
      
        if (errorText.includes('exceeded the DAILY quota')) {
          setErrorMsg('⚠️ Daily quota for deep plagiarism detection exceeded. Please try again tomorrow or upgrade your plan.');
        } else {
          setErrorMsg(errorText);
        }
      }
      
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="wizard-container">
      <h2 className="wizard-title">Start Detection</h2>

      <div className="progress-bar">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`step-indicator ${step >= num ? 'active' : ''}`}
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
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          ) : (
            <textarea
              id="detectionInput"
              rows={selectedService === 'code' ? 8 : 6}
              placeholder={selectedService === 'text' ? 'Type or paste your text here...' : 'Paste your code here...'}
              value={inputData}
              onChange={handleInputChange}
            />
          )}

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
                  value="deep"
                  checked={detectionMode === 'deep'}
                  onChange={() => setDetectionMode('deep')}
                />
                Deep Check (API-based)
              </label>
            </div>
          )}

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <div>
            <button className="back-btn" onClick={handleBack}>Back</button>
            <button
              className="start-btn"
              onClick={handleStartDetection}
              disabled={selectedService === 'image' ? !imageFile : !inputData.trim()}
            >
              {loading ? 'Detecting...' : 'Start Detection'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="result-section">
          
          {result && Object.keys(result).length > 0 && (
  <div className="result-box p-4 bg-gray-100 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4">Detection Result</h2>

    {/* Handle normal mode */}
    {typeof result.plagiarismScore !== 'undefined' && (
      <p><strong>Plagiarism Score:</strong> {result.plagiarismScore}%</p>
    )}
    {result.receivedText && (
      <p><strong>Original Text:</strong> {result.receivedText}</p>
    )}
    {result.plagiarizedText && (
      <p><strong>Plagiarized Text:</strong> {result.plagiarizedText}</p>
    )}
    {result.matchedSources && result.matchedSources.length > 0 && (
      <div>
        <strong>Matched Sources:</strong>
        <ul className="list-disc ml-6">
          {result.matchedSources.map((source, index) => (
            <li key={index}>{source}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Handle deep mode */}
    {result.status === "no_duplicate_content_found" && (
      <p className="text-green-600 font-semibold">
        No duplicate content found. 🎉
      </p>
    )}
    {result.duplicate_content_found_on_links &&
      result.duplicate_content_found_on_links.length > 0 && (
        <div>
          <strong>Duplicate content found on:</strong>
          <ul className="list-disc ml-6">
            {result.duplicate_content_found_on_links.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
  </div>
)}

          <button className="back-btn" onClick={() => setStep(1)}>Start Over</button>
        </div>
      )}
    </div>
  );
};

export default StartDetecting;
