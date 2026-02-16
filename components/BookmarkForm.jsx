"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function BookmarkForm({ userId, onBookmarkAdded }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    const { error } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: userId }]);
    if (error) {
      console.error(error);
    } else {
      setTitle("");
      setUrl("");
      if (onBookmarkAdded) onBookmarkAdded(); // refresh list
    }
  };

  return (
    <div className="mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 mr-2"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        className="border p-2 mr-2"
      />
      <button
        onClick={addBookmark}
        className="px-3 py-2 bg-green-600 text-white rounded"
      >
        Add
      </button>
    </div>
  );
}
