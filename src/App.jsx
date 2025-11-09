import { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./Dashboard";

function App() {
  const [page, setPage] = useState("welcome"); // welcome | signup | login | dashboard
  const [fade, setFade] = useState("opacity-100");

  // 🧠 Check session on load
  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setPage("dashboard");
    }
  }, []);

  // ✨ Smooth fade animation
  const changePage = (newPage) => {
    setFade("opacity-0");
    setTimeout(() => {
      setPage(newPage);
      setFade("opacity-100");
    }, 300);
  };

  const handleLoginSuccess = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    changePage("dashboard");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    changePage("welcome");
  };

  return (
    <div
      className={`min-h-screen transition-opacity duration-300 ${fade} font-[Poppins]`}
    >
      {page === "welcome" && (
        <Welcome
          onSignIn={() => changePage("login")}
          onSignUp={() => changePage("signup")}
        />
      )}

      {page === "signup" && <Signup onBack={() => changePage("login")} />}

      {page === "login" && (
        <Login onLogin={handleLoginSuccess} onBack={() => changePage("signup")} />
      )}

      {page === "dashboard" && <Dashboard onLogout={handleLogout} />}
    </div>
  );
}

export default App;
