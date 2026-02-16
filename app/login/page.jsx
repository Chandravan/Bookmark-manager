"use client";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const signIn = async () => {
    // Ekdum simple 1-line logic
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="p-10 bg-white shadow-lg rounded-xl text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">My Project</h1>

        <button
          onClick={signIn}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors active:opacity-90"
        >
          Sign in with Google
        </button>

        <p className="mt-4 text-xs text-gray-400 font-medium uppercase tracking-widest">
          Powered by Supabase
        </p>
      </div>
    </div>
  );
}
