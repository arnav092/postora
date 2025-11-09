import { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  const [page, setPage] = useState("welcome"); // welcome, signup, login, dashboard

  // 🧠 check session on load
  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setPage("dashboard");
    }
  }, []);

  const handleLoginSuccess = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setPage("dashboard");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setPage("welcome");
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <ThemeSelector />

      {page === "welcome" && (
        <Welcome onSignIn={() => setPage("login")} onSignUp={() => setPage("signup")} />
      )}

      {page === "signup" && <Signup onBack={() => setPage("login")} />}

      {page === "login" && (
        <Login onBack={() => setPage("signup")} onLogin={handleLoginSuccess} />
      )}

      {page === "dashboard" && <Dashboard onLogout={handleLogout} />}
    </div>
  );
}

export default App;
