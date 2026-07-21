import useAnimatedCounter from "../../hooks/useAnimatedCounter";
import { compactNumber } from "../../utils/formatters";
const AnimatedCounter = ({ value, suffix = "", label }) => {
  const { ref, value: current } = useAnimatedCounter(value);
  return (
    <div
      ref={ref}
      className="glass-card rounded-3xl p-6 text-center shadow-glow"
    >
      <div className="font-display text-4xl font-extrabold text-portfolio-text md:text-5xl">
        {compactNumber(current)}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-medium uppercase tracking-[0.22em] text-portfolio-subtext">
        {label}
      </p>
    </div>
  );
};
export default AnimatedCounter;
