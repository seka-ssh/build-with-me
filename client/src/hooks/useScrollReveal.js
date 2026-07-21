import { useEffect, useRef, useState } from "react";
const useScrollReveal = (options = { threshold: 0.2 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const n = ref.current;
    if (!n) return undefined;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setIsVisible(true);
        o.unobserve(e.target);
      }
    }, options);
    o.observe(n);
    return () => o.disconnect();
  }, [options]);
  return { ref, isVisible };
};
export default useScrollReveal;
