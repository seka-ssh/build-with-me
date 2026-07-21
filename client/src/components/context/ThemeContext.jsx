import { createContext, useContext, useEffect, useMemo, useState } from "react";
const ThemeContext = createContext(null);
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("sekaTheme") || "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("sekaTheme", theme);
  }, [theme]);
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const c = useContext(ThemeContext);
  if (!c) throw new Error("useTheme must be used inside ThemeProvider");
  return c;
};
