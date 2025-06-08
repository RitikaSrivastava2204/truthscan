const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const {
  jaccardSimilarity,
  nGramJaccardSimilarity,
} = require("./utils/plagiarismUtils");
const loadReferenceTexts = require("./utils/loadReferenceTexts");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

// Example reference content for basic mode
const referenceTexts = loadReferenceTexts(
  path.join(__dirname, "reference_texts")
);

app.post("/detect", async (req, res) => {
  const { text, mode } = req.body;

  if (!text || !mode) {
    return res.status(400).json({ error: "Missing text or mode." });
  }

  if (mode === "basic") {
    let maxScore = 0;

    referenceTexts.forEach((refText) => {
      const score = nGramJaccardSimilarity(text, refText, 3); // using n=3
      if (score > maxScore) {
        maxScore = score;
      }
    });

    return res.json({
      mode: "basic",
      receivedText: text,
      plagiarismScore: maxScore.toFixed(2),
    });
  }

  if (mode === "deep") {
    try {
      const params = new URLSearchParams();
      params.append("text", text);

      const response = await axios.post(
        "https://plagiarism-source-checker-with-links.p.rapidapi.com/data",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
            "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
          },
        }
      );

      const scanResult = response.data;

      return res.json({
        status: scanResult.status,
        duplicate_content_found_on_links:
          scanResult.duplicate_content_found_on_links,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      console.error("RapidAPI error:", errorMessage);

      return res.status(500).json({
        error: "Deep plagiarism detection failed.",
        message: errorMessage,
      });
    }
  }

  return res.status(400).json({ error: 'Mode must be "basic" or "deep"' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running properly!");
});
