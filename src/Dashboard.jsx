import { useState } from "react";

function Dashboard({ onLogout }) {
  const [instagramAccount, setInstagramAccount] = useState(
    JSON.parse(localStorage.getItem("postora_instagram")) || null
  );

  const handleConnectInstagram = () => {
    // ⚙️ Later, we’ll replace this with real Instagram OAuth via API
    const username = prompt("Enter your Instagram username:");
    if (!username) return alert("Connection cancelled.");

    const fakeAccount = {
      username: username,
      profilePic:
        "https://cdn-icons-png.flaticon.com/512/174/174855.png", // Instagram logo placeholder
    };

    localStorage.setItem("postora_instagram", JSON.stringify(fakeAccount));
    setInstagramAccount(fakeAccount);
    alert(`✅ ${username} connected successfully!`);
  };

  const handleDisconnectInstagram = () => {
    if (confirm("Are you sure you want to remove your Instagram account?")) {
      localStorage.removeItem("postora_instagram");
      setInstagramAccount(null);
      alert("Instagram account disconnected.");
    }
  };

  const goToScheduler = (type) => {
    alert(`Navigating to ${type} scheduler page...`);
    // 🔗 Later we’ll route this to the Post/Reel scheduler component
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <h1 className="text-4xl font-bold text-[var(--accent)] mb-2">
        Postora Dashboard
      </h1>
      <p className="text-gray-500 mb-10">
        Manage your connected accounts and schedule posts
      </p>

      {/* If no Instagram account connected */}
      {!instagramAccount ? (
        <div className="bg-[var(--card)] p-8 rounded-2xl shadow-lg text-center border border-gray-200 dark:border-gray-700 w-96">
          <h2 className="text-xl mb-4 font-semibold">
            Connect Your Instagram Account
          </h2>
          <button
            onClick={handleConnectInstagram}
            className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            ➕ Add Instagram Account
          </button>
        </div>
      ) : (
        // If Instagram account is connected
        <div className="bg-[var(--card)] p-8 rounded-2xl shadow-lg text-center border border-gray-200 dark:border-gray-700 w-[400px]">
          <img
            src={instagramAccount.profilePic}
            alt="Instagram"
            className="w-20 h-20 rounded-full mx-auto mb-4 border border-[var(--accent)]"
          />
          <h2 className="text-2xl font-semibold mb-2">
            @{instagramAccount.username}
          </h2>
          <p className="text-gray-500 mb-6">Account connected successfully</p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => goToScheduler("post")}
              className="py-2 bg-[var(--accent)] text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
            >
              🗓️ Schedule Post
            </button>
            <button
              onClick={() => goToScheduler("reel")}
              className="py-2 bg-[var(--accent)] text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
            >
              🎥 Schedule Reel
            </button>
          </div>

          <button
            onClick={handleDisconnectInstagram}
            className="mt-6 text-sm text-red-500 hover:underline"
          >
            Disconnect Instagram
          </button>
        </div>
      )}

      <button
        onClick={onLogout}
        className="mt-10 text-gray-400 hover:text-red-400 transition text-sm underline"
      >
        Log out
      </button>
    </div>
  );
}

export default Dashboard;
