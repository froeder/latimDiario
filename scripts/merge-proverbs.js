const fs = require('fs');
const path = require('path');

const { PROVERBS_FROM_BOOK } = require('../scratch_enrich.js');

function toClassicalPhonetic(latin) {
  return latin
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\"\'\?\[\]]/g, '')
    .trim()
    .split(/\s+/)
    .map(word => {
      let w = word;
      w = w.replace(/qu/g, 'kw');
      w = w.replace(/gu(?=[aeiouy])/g, 'gw');
      w = w.replace(/c/g, 'k');
      w = w.replace(/v/g, 'w');
      w = w.replace(/ph/g, 'f');
      w = w.replace(/th/g, 't');
      w = w.replace(/ch/g, 'kh');
      w = w.replace(/x/g, 'ks');
      return w;
    })
    .join(' ');
}

function toEcclesiasticalPhonetic(latin) {
  return latin
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\"\'\?\[\]]/g, '')
    .trim()
    .split(/\s+/)
    .map(word => {
      let w = word;
      w = w.replace(/ae|oe/g, 'e');
      w = w.replace(/gn/g, 'nh');
      w = w.replace(/xc(?=[eiy])/g, 'k-ch');
      w = w.replace(/sc(?=[eiy])/g, 'ch');
      w = w.replace(/cc(?=[eiy])/g, 'ttch');
      w = w.replace(/c(?=[eiy])/g, 'tch');
      w = w.replace(/c/g, 'k');
      w = w.replace(/g(?=[eiy])/g, 'dj');
      w = w.replace(/qu/g, 'kw');
      w = w.replace(/ph/g, 'f');
      w = w.replace(/th/g, 't');
      w = w.replace(/ch/g, 'k');
      w = w.replace(/ti(?=[aeou])/g, 'tsi');
      w = w.replace(/x/g, 'ks');
      return w;
    })
    .join(' ');
}

const latinDataPath = path.join(__dirname, '..', 'constants', 'latin-data.ts');
let content = fs.readFileSync(latinDataPath, 'utf8');

// Enrich PROVERBS_FROM_BOOK with pronunciations and era
const enrichedProverbs = PROVERBS_FROM_BOOK.map(p => {
  return {
    ...p,
    era: p.era || 'Tradição Clássica e Imperial',
    source: p.source || '500 Provérbios em Latim (Sidney Vieira, 2016)',
    classicalPronunciation: p.classicalPronunciation || toClassicalPhonetic(p.latin),
    ecclesiasticalPronunciation: p.ecclesiasticalPronunciation || toEcclesiasticalPhonetic(p.latin)
  };
});

// We want to keep the original 13 quotes, and append the 122 enriched proverbs.
// Let's find the closing of LATIN_QUOTES:
const quoteEndMarker = '\n];\n\nexport const LATIN_WORDS';
const parts = content.split(quoteEndMarker);

if (parts.length !== 2) {
  console.error('Could not find split marker in latin-data.ts');
  process.exit(1);
}

// Convert enrichedProverbs to TypeScript code
function formatQuote(q) {
  return `  {
    id: ${JSON.stringify(q.id)},
    latin: ${JSON.stringify(q.latin)},
    translation: ${JSON.stringify(q.translation)},
    author: ${JSON.stringify(q.author)},
    source: ${JSON.stringify(q.source)},
    era: ${JSON.stringify(q.era)},
    category: ${JSON.stringify(q.category)},
    historicalContext: ${JSON.stringify(q.historicalContext)},
    reflection: ${JSON.stringify(q.reflection)},
    classicalPronunciation: ${JSON.stringify(q.classicalPronunciation)},
    ecclesiasticalPronunciation: ${JSON.stringify(q.ecclesiasticalPronunciation)},
    tags: ${JSON.stringify(q.tags)},
  },`;
}

const additionalQuotesTs = enrichedProverbs.map(formatQuote).join('\n');

const newLatinQuotesSection = parts[0] + '\n' + additionalQuotesTs + '\n];\n\nexport const LATIN_WORDS' + parts[1];

fs.writeFileSync(latinDataPath, newLatinQuotesSection, 'utf8');
console.log(`Successfully merged ${enrichedProverbs.length} proverbs into constants/latin-data.ts!`);
