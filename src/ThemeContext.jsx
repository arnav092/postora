import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [customColor, setCustomColor] = useState("#7B2FF7");

  useEffect(() => {
    document.documentElement.className = "";
    document.documentElement.classList.add(theme);
    document.documentElement.style.setProperty("--accent", customColor);
  }, [theme, customColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customColor, setCustomColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
