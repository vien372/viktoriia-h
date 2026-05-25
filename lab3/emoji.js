const dictionary = {
  "сонце":    "☀️",
  "хмара":    "☁️",
  "дощ":      "🌧️",
  "сніг":     "❄️",
  "блискавка":"⚡",
  "серце":    "❤️",
  "усмішка":  "😊",
  "сум":      "😢",
  "сміх":     "😂",
  "кава":     "☕",
  "піца":     "🍕",
  "яблуко":   "🍎",
  "собака":   "🐶",
  "кіт":      "🐱",
  "книга":    "📚",
  "телефон":  "📱",
  "комп":     "💻",
};

function translate(text) {
  return text.replace(/[а-яієїґ]+/gi, (word) => {
    const lowerWord = word.toLowerCase();
    return dictionary[lowerWord] || word;
  });
}

function translateReverse(text) {
  const reverseDictionary = {};
  for (const [word, emoji] of Object.entries(dictionary)) {
    reverseDictionary[emoji] = word;
  }

  const emojis = Object.keys(reverseDictionary);
  const escapedEmojis = emojis.map(e => e.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));

  const regex = new RegExp(escapedEmojis.join('|'), 'g');

  return text.replace(regex, (emoji) => reverseDictionary[emoji] || emoji);
}

console.log(translate("сьогодні сонце і усмішка")); 

console.log(translate("СОНЦЕ і Хмара. Дощ?")); 

console.log(translateReverse("☀️ і ☁️")); 

console.log(translateReverse("Сьогодні була ☕, а потім 🍕.")); 