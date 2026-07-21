import { useEffect, useRef, useState } from "react";
const useAnimatedCounter = (end, duration = 1400) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const n = ref.current;
    if (!n) return undefined;
    const o = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        o.unobserve(e.target);
      },
      { threshold: 0.35 },
    );
    o.observe(n);
    return () => o.disconnect();
  }, [end, duration]);
  return { ref, value };
};
export default useAnimatedCounter;
