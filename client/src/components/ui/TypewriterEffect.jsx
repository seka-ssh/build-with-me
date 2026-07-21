import useTypingEffect from "../../hooks/useTypingEffect";
const TypewriterEffect = ({ phrases }) => {
  const text = useTypingEffect(phrases);
  return (
    <span className="inline-flex min-h-[2.25rem] items-center text-portfolio-gold-light">
      {text}
      <span
        className="ml-1 h-8 w-[3px] animate-pulse rounded-full bg-portfolio-gold"
        aria-hidden="true"
      />
    </span>
  );
};
export default TypewriterEffect;
