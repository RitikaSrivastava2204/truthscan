const { model } = require("mongoose");

function preprocessText(text) {
    return text
      .toLowerCase()                   // convert to lowercase
      .replace(/[^\w\s]/g, '')          // remove punctuation
      .replace(/\s+/g, ' ')             // normalize spaces
      .trim();                          // remove extra spaces at start/end
  }
  
  function nGramJaccardSimilarity(text1, text2, n = 3) {
    text1 = preprocessText(text1);
    text2 = preprocessText(text2);
  
    const nGrams = (text, n) => {
      const words = text.split(' ');
      const nGrams = [];
      for (let i = 0; i <= words.length - n; i++) {
        nGrams.push(words.slice(i, i + n).join(' '));
      }
      return nGrams;
    };
  
    const set1 = new Set(nGrams(text1, n));
    const set2 = new Set(nGrams(text2, n));
  
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
  
    return (intersection.size / union.size) * 100;
  }
  
  module.exports = nGramJaccardSimilarity;
  