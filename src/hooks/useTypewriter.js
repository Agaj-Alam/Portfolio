import { useState, useEffect } from 'react';

export function useTypewriter(words, speed = 80, pause = 1800) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[idx % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(w.slice(0, text.length + 1));
          if (text.length === w.length) setTimeout(() => setDel(true), pause);
        } else {
          setText(w.slice(0, text.length - 1));
          if (text.length === 0) {
            setDel(false);
            setIdx((i) => i + 1);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, idx, words, speed, pause]);
  return text;
}

// ─── AMBIENT BG ──────────────────────────────────────────────────────────────