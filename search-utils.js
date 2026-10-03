"use strict";

(function () {
  const STOP_WORDS = new Set(["a", "an", "and", "for", "in", "of", "the", "to", "with"]);

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function tokens(value) {
    return normalize(value)
      .split(/\s+/)
      .filter(Boolean)
      .filter((token) => !STOP_WORDS.has(token));
  }

  function editDistance(a, b) {
    if (a === b) return 0;
    if (!a || !b) return Math.max(a.length, b.length);
    const previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 0; i < a.length; i += 1) {
      let diagonal = previous[0];
      previous[0] = i + 1;
      for (let j = 0; j < b.length; j += 1) {
        const above = previous[j + 1];
        previous[j + 1] = a[i] === b[j]
          ? diagonal
          : Math.min(diagonal + 1, previous[j] + 1, above + 1);
        diagonal = above;
      }
    }
    return previous[b.length];
  }

  function tokenScore(queryToken, contentTokens) {
    let best = 0;
    for (const contentToken of contentTokens) {
      if (contentToken === queryToken) return 100;
      if (contentToken.startsWith(queryToken) && queryToken.length >= 2) {
        best = Math.max(best, 80 + Math.min(queryToken.length, 10));
        continue;
      }
      if (queryToken.length >= 4 && contentToken.length >= 4) {
        const distance = editDistance(queryToken, contentToken);
        const limit = queryToken.length >= 7 ? 2 : 1;
        if (distance <= limit) best = Math.max(best, 55 - distance * 10);
      }
    }
    return best;
  }

  function score(query, content) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return 0;
    const queryTokens = tokens(normalizedQuery);
    const contentNormalized = normalize(content);
    const contentTokens = tokens(contentNormalized);
    if (!queryTokens.length || !contentTokens.length) return 0;

    let total = 0;
    for (const queryToken of queryTokens) {
      const value = tokenScore(queryToken, contentTokens);
      if (!value) return 0;
      total += value;
    }

    if (contentNormalized.includes(normalizedQuery)) total += 40;
    if (normalize(content).startsWith(normalizedQuery)) total += 20;
    return total;
  }

  function search(elements, query, getContent) {
    const normalizedQuery = normalize(query);
    return elements.map((element, index) => ({
      element,
      index,
      score: normalizedQuery ? score(normalizedQuery, getContent(element)) : 0
    })).filter((item) => !normalizedQuery || item.score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index);
  }

  window.UtilityHubSearch = Object.freeze({ normalize, tokens, score, search });
})();
