function Welcome({ onSignIn, onSignUp }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-gradient)] text-center p-6">
      <div className="glass max-w-md w-full p-10">
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-4">Welcome to Postora 🌤️</h1>
        <p className="text-gray-600 mb-8">
          Schedule posts, manage content, and grow your audience — all in one place.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onSignUp}
            className="py-3 bg-[var(--accent)] text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Get Started
          </button>
          <button
            onClick={onSignIn}
            className="py-3 border border-[var(--accent)] text-[var(--accent)] rounded-lg font-semibold hover:bg-[var(--accent)] hover:text-white transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
