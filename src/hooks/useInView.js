import { useState, useEffect } from 'react';

export function useInView(threshold = 0.15) {
  const [element, setElement] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!element) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    obs.observe(element);
    return () => obs.disconnect();
  }, [element, threshold]);
  return [setElement, visible];
}