"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BookmarkForm from "../../components/BookmarkForm";
import BookmarkList from "../../components/BookmarkList";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchBookmarks();

    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookmarks:", error);
    } else {
      setBookmarks(data || []);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Your Bookmarks</h1>
      <BookmarkForm userId={user?.id} />
      <BookmarkList bookmarks={bookmarks} userId={user?.id} />
    </div>
  );
}
