import axios from "axios";

function App() {

  const handleGitHubLogin = async () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-[400px]">

        <h1 className="text-4xl font-bold mb-4 text-center">
          GitGuard AI
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Automated AI Pull Request Reviewer
        </p>

        <button
          onClick={handleGitHubLogin}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
        >
          Continue with GitHub
        </button>

      </div>

    </div>
  );
}

export default App;