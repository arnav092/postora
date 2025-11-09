import { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebase";

function Signup({ onBack }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Manual signup (email + username + password)
  const handleSignup = () => {
    if (!email || !username || !password)
      return alert("Please fill all fields!");
    if (!email.endsWith("@gmail.com"))
      return alert("Only Gmail addresses are allowed!");

    const users = JSON.parse(localStorage.getItem("postora_users")) || [];

    if (users.find((u) => u.username === username))
      return alert("Username already exists!");
    if (users.find((u) => u.email === email))
      return alert("Email already registered! Please log in.");

    users.push({ email, username, password });
    localStorage.setItem("postora_users", JSON.stringify(users));
    alert("✅ Signup successful! You can now login.");
    onBack();
  };

  // ✅ Google signup (asks for username + prevents duplicates)
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const users = JSON.parse(localStorage.getItem("postora_users")) || [];
      const existingUser = users.find((u) => u.email === user.email);

      if (existingUser) {
        alert("This Google account already exists! Please sign in.");
        onBack(); // redirect to login
      } else {
        let newUsername = prompt("Choose a unique username:");
        if (!newUsername) return alert("Signup cancelled.");

        while (users.find((u) => u.username === newUsername)) {
          newUsername = prompt("Username already taken! Try another one:");
          if (!newUsername) return alert("Signup cancelled.");
        }

        users.push({
          email: user.email,
          username: newUsername,
          google: true,
        });

        localStorage.setItem("postora_users", JSON.stringify(users));
        alert(`Welcome ${newUsername}! 🎉 Account created.`);
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Google signup failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-[var(--accent)] mb-6">
        Create Your Account
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
          type="text"
          placeholder="Choose username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-[var(--text)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <input
          type="password"
          placeholder="Choose password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-[var(--text)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <button
          onClick={handleSignup}
          className="w-full py-2 bg-[var(--accent)] text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <div className="text-center my-4 text-gray-500">— or —</div>

        <button
          onClick={handleGoogleSignup}
          className="w-full py-2 bg-white dark:bg-gray-900 text-[var(--text)] border rounded-lg font-semibold shadow-md hover:opacity-90 transition flex justify-center items-center gap-2"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="w-5 h-5"
          />
          Sign Up with Google
        </button>

        <p
          onClick={onBack}
          className="text-sm text-center mt-3 text-gray-500 hover:text-[var(--accent)] cursor-pointer"
        >
          Already have an account? Sign In
        </p>
      </div>
    </div>
  );
}

export default Signup;
