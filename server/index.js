const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { submitScan, getScanReport } = require('./copyleaks');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Simulated reference texts for basic mode (Jaccard similarity)
const referenceTexts = [
  "Plagiarism is the representation of another author's language or ideas as one's own.",
  "Artificial Intelligence is revolutionizing the way we interact with technology.",
  "Climate change is one of the most pressing issues facing our world today.",
  "This project aims to detect AI-generated and plagiarized content from input text."
];

// Basic mode: simple Jaccard Similarity function
function jaccardSimilarity(a, b) {
  const cleanAndTokenize = (text) =>
    new Set(
      text
        .toLowerCase()
        .replace(/[’'‘`]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(Boolean)
    );

  const setA = cleanAndTokenize(a);
  const setB = cleanAndTokenize(b);

  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return intersection.size / union.size;
}

// /detect route supports mode: "basic" or "deep"
app.post('/detect', async (req, res) => {
  const { text, mode } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid input text' });
  }

  if (!mode || !['basic', 'deep'].includes(mode)) {
    return res.status(400).json({ error: 'Mode must be "basic" or "deep"' });
  }

  try {
    if (mode === 'basic') {
      // Run local plagiarism check using Jaccard similarity
      let highestScore = 0;
      for (const refText of referenceTexts) {
        const score = jaccardSimilarity(text, refText);
        if (score > highestScore) highestScore = score;
      }
      const plagiarismScore = Math.round(highestScore * 100);
      res.json({ plagiarismScore, mode: 'basic' });

    } else if (mode === 'deep') {
      // Submit scan to Copyleaks API (using your submitScan function)
      const result = await submitScan(text);

      if (result.success) {
        // Respond with success message and scanId from Copyleaks
        res.json({
          message: 'Text submitted to Copyleaks for analysis',
          scanId: result.scanId,
          mode: 'deep'
        });
      } else {
        res.status(500).json({ error: result.error });
      }
    }
  } catch (error) {
    console.error('❌ Detection error:', error.message);
    res.status(500).json({ error: 'Something went wrong during detection' });
  }
});

// New route to fetch Copyleaks scan report by scanId
app.get('/report/:scanId', async (req, res) => {
  const { scanId } = req.params;

  try {
    const result = await getScanReport(scanId);

    if (result.success) {
      res.json({ report: result.data });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('❌ Report fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch scan report' });
  }
});

app.get('/', (req, res) => {
  res.send('TruthScan Backend is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
