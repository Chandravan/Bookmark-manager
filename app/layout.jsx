"use client";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Session check karne ke liye
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getSession();

    // Real-time auth state change sunne ke liye (Login/Logout detect karne ke liye)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login"; // Logout ke baad seedha login par bhej do
  };

  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <div className="min-h-screen">
          {/* 1. Navbar: Sirf tab dikhega jab user logged in ho aur loading na ho */}
          {!loading && user && (
            <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
              <Link
                href="/"
                className="font-black text-xl text-blue-600 tracking-tighter uppercase"
              >
                Mark.it
              </Link>

              <div className="flex items-center gap-6">
                <Link
                  href="/bookmarks"
                  className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
                >
                  My Bookmarks
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-500 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all active:scale-95"
                >
                  LOGOUT
                </button>
              </div>
            </nav>
          )}

          {/* 2. Main Content */}
          <main className={user ? "p-6 md:p-10 max-w-5xl mx-auto" : ""}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
