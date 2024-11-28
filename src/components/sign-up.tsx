import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/",
        prompt: "select_account",
      });
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {loading ? "Signing up..." : "Sign up with Google"}
    </button>
  );
}
