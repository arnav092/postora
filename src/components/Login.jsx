import { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebase";

function Login({ onBack, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Manual login
  const handleLogin = () => {
    if (!email || !password) return alert("Please fill all fields!");
    const users = JSON.parse(localStorage.getItem("postora_users")) || [];

    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) return alert("No account found with this email!");
    if (existingUser.google)
      return alert("This account is linked with Google. Please sign in using Google!");
    if (existingUser.password !== password)
      return alert("Incorrect password! Try again.");

    alert(`Welcome back, ${existingUser.username} 👋`);
    sessionStorage.setItem("isLoggedIn", "true");
    onLogin();
  };

  // ✅ Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const users = JSON.parse(localStorage.getItem("postora_users")) || [];
      const existingUser = users.find((u) => u.email === user.email);

      if (existingUser) {
        alert(`Welcome back, ${existingUser.username} 👋`);
        sessionStorage.setItem("isLoggedIn", "true");
        onLogin();
      } else {
        alert(
          "This Google account is not registered yet. Please sign up first!"
        );
        onBack(); // Redirect to signup
      }
    } catch (error) {
      console.error(error);
      alert("Google sign-in failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-[var(--accent)] mb-6">
        Welcome Back 👋
      </h1>

      <div className="bg-[var(--card)] p-6 rounded-2xl shadow-lg w-96 border border-gray-200 dark:border-gray-700">
        <input
          type="email"
          placeholder="Your Gmail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-[var(--text)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-[var(--text)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-[var(--accent)] text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
        >
          Sign In
        </button>

        <div className="text-center my-4 text-gray-500">— or —</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 bg-white dark:bg-gray-900 text-[var(--text)] border rounded-lg font-semibold shadow-md hover:opacity-90 transition flex justify-center items-center gap-2"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="w-5 h-5"
          />
          Sign In with Google
        </button>

        <p
          onClick={onBack}
          className="text-sm text-center mt-3 text-gray-500 hover:text-[var(--accent)] cursor-pointer"
        >
          Don’t have an account? Sign Up
        </p>
      </div>
    </div>
  );
}

export default Login;
