import { useState } from "react";

function Signup({ onBack }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!email.endsWith("@gmail.com")) return alert("Please enter a valid Gmail address!");
    if (!username || !password) return alert("All fields are required!");

    const users = JSON.parse(localStorage.getItem("postora_users")) || [];
    if (users.find((u) => u.username === username))
      return alert("Username already taken, try another one!");

    users.push({ email, username, password });
    localStorage.setItem("postora_users", JSON.stringify(users));
    alert("Signup successful! Please log in.");
    onBack();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-gradient)] p-6">
      <div className="glass w-full max-w-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-[var(--accent)]">Create Account ✨</h1>
        <p className="text-gray-500 mb-6">Join Postora and plan your Instagram growth!</p>

        <input
          type="email"
          placeholder="Email (Gmail only)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent)] outline-none"
        />
        <input
          type="text"
          placeholder="Choose Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent)] outline-none"
        />
        <input
          type="password"
          placeholder="Choose Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent)] outline-none"
        />

        <button
          onClick={handleSignup}
          className="w-full py-2 bg-[var(--accent)] text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <p
          onClick={onBack}
          className="text-sm text-gray-500 mt-4 cursor-pointer hover:text-[var(--accent)]"
        >
          Already have an account? Sign In
        </p>
      </div>
    </div>
  );
}

export default Signup;
