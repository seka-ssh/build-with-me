import { useEffect, useState } from "react";
const useTypingEffect = (phrases, speed = 55, pause = 1400) => {
  const [i, setI] = useState(0),
    [c, setC] = useState(0),
    [del, setDel] = useState(false);
  useEffect(() => {
    const phrase = phrases[i];
    const t = setTimeout(
      () => {
        if (!del && c < phrase.length) setC((v) => v + 1);
        else if (!del && c === phrase.length)
          setTimeout(() => setDel(true), pause);
        else if (del && c > 0) setC((v) => v - 1);
        else if (del && c === 0) {
          setDel(false);
          setI((v) => (v + 1) % phrases.length);
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [c, del, i, phrases, speed, pause]);
  return phrases[i].slice(0, c);
};
export default useTypingEffect;
