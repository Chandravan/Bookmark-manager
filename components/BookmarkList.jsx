"use client";
import { supabase } from "../lib/supabase";

export default function BookmarkList({ bookmarks, setBookmarks, userId }) {
  const deleteBookmark = async (id) => {
    // 1. Database se delete karo
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (!error) {
      // 2. UI ko turant update karo (Filter out the deleted item)
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } else {
      alert("Error deleting bookmark!");
    }
  };

  if (bookmarks.length === 0) {
    return (
      <p className="text-center text-gray-400 py-10">
        No bookmarks found. Start adding some!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{b.title}</span>
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline truncate max-w-[200px] sm:max-w-xs"
            >
              {b.url}
            </a>
          </div>

          <button
            onClick={() => deleteBookmark(b.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Bookmark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.34 6m-2.52 0L11.82 9m10.17-2.43a48.536 48.536 0 0 0-5.93-1.22l-.45-1.35C15.11 2.22 13.5 2 12 2s-3.11.22-3.66 1.45l-.45 1.35a48.537 48.537 0 0 0-5.93 1.22m16.5 0L18.81 20.24a2.25 2.25 0 0 1-2.25 2.25H7.44a2.25 2.25 0 0 1-2.25-2.25L5.11 6.57m10.71 0h-10.71"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
