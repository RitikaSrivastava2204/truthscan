const { model } = require("mongoose");

// Jaccard Similarity Function for basic mode
function jaccardSimilarity(text1, text2) {
  const set1 = new Set(text1.split(/\s+/));
  const set2 = new Set(text2.split(/\s+/));
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return (intersection.size / union.size) * 100;
}

function generateNGrams(text, n) {
  const words = text.split(/\s+/);
  const nGrams = [];
  for (let i = 0; i <= words.length - n; i++) {
    nGrams.push(words.slice(i, i + n).join(" "));
  }
  return nGrams;
}
function nGramJaccardSimilarity(text1, text2, n) {
  const nGrams1 = new Set(generateNGrams(text1, n));
  const nGrams2 = new Set(generateNGrams(text2, n));

  const intersection = new Set([...nGrams1].filter((x) => nGrams2.has(x)));
  const union = new Set([...nGrams1, ...nGrams2]);

  return (intersection.size / union.size) * 100;
}

module.exports = {
  jaccardSimilarity,
  generateNGrams,
  nGramJaccardSimilarity
};
