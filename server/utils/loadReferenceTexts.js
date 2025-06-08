const fs = require('fs');
const path = require('path');

function loadReferenceTexts(folderPath) {
  const files = fs.readdirSync(folderPath);
  const texts = files.map(file => {
    const filePath = path.join(folderPath, file);
    return fs.readFileSync(filePath, 'utf8');
  });
  return texts;
}

module.exports = loadReferenceTexts;
