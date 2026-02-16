"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!user) {
    return (
      <div className="text-center bg-white p-10 rounded-2xl shadow-sm border mt-10">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <Link href="/login" className="text-blue-600 underline">
          Please login first
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-3xl font-bold mb-2">
        Welcome, {user.email?.split("@")[0]}
      </h2>
      <p className="text-gray-500 mb-8 text-lg">
        You are now in your private workspace.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 border rounded-xl hover:border-blue-400 transition-colors">
          <h3 className="font-bold text-lg mb-1">Your Library</h3>
          <p className="text-sm text-gray-400 mb-4">
            Access all your saved links.
          </p>
          <Link href="/bookmarks" className="text-blue-600 font-semibold">
            Open Bookmarks →
          </Link>
        </div>
      </div>
    </div>
  );
}
