export default function useDictionary() {
  const cache = new Map();

  async function validateWord(word) {
    if (cache.has(word)) return cache.get(word);

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const valid = res.ok;
      let meaning = "";
      if (valid) {
        const data = await res.json();
        meaning = data[0]?.meanings?.[0]?.definitions?.[0]?.definition || "";
      }
      const result = { valid, meaning };
      cache.set(word, result);
      return result;
    } catch (err) {
      return { valid: false, meaning: "" };
    }
  }

  return { validateWord };
}
