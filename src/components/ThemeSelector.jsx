import { useTheme } from "../ThemeContext";

export default function ThemeSelector() {
  const { theme, setTheme, customColor, setCustomColor } = useTheme();

  return (
    <div className="fixed top-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 rounded-xl shadow-md text-sm flex flex-col gap-3 border border-gray-200 dark:border-gray-700 z-50">
      <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-100">Theme</h3>

      <label className="flex items-center gap-2">
        <input type="radio" name="theme" value="light"
          checked={theme === "light"}
          onChange={() => setTheme("light")} />
        <span>Light (default)</span>
      </label>

      <label className="flex items-center gap-2">
        <input type="radio" name="theme" value="dark"
          checked={theme === "dark"}
          onChange={() => setTheme("dark")} />
        <span>Dark</span>
      </label>

      <label className="flex items-center gap-2">
        <input type="radio" name="theme" value="custom"
          checked={theme === "custom"}
          onChange={() => setTheme("custom")} />
        <span>Custom</span>
        {theme === "custom" && (
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="ml-2 w-6 h-6 border-0 cursor-pointer"
          />
        )}
      </label>
    </div>
  );
}
