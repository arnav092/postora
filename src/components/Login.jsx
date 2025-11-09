import { useState } from "react";

function Login({ onLogin, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("postora_users")) || [];
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      sessionStorage.setItem("isLoggedIn", "true");
      onLogin();
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-gradient)] p-6">
      <div className="glass w-full max-w-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-[var(--accent)]">Welcome Back 👋</h1>
        <p className="text-gray-500 mb-6">Log in to continue scheduling your posts</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent)] outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent)] outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-[var(--accent)] text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          Sign In
        </button>

        <p
          onClick={onBack}
          className="text-sm text-gray-500 mt-4 cursor-pointer hover:text-[var(--accent)]"
        >
          Don’t have an account? Sign Up
        </p>
      </div>
    </div>
  );
}

export default Login;
