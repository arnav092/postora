function Welcome({ onSignIn, onSignUp }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <h1 className="text-5xl font-bold mb-4 text-[var(--accent)] tracking-tight">
        Welcome to Postora ✨
      </h1>
      <p className="text-lg text-gray-500 mb-10">
        Plan, schedule, and manage your social posts like a pro.
      </p>

      <div className="flex gap-6">
        <button
          onClick={onSignUp}
          className="px-8 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <button
          onClick={onSignIn}
          className="px-8 py-3 rounded-xl border border-[var(--accent)] text-[var(--accent)] font-semibold shadow-md hover:bg-[var(--accent)] hover:text-white transition"
        >
          Sign In
        </button>
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        Crafted with ❤️ by Arnav Jain
      </footer>
    </div>
  );
}

export default Welcome;
