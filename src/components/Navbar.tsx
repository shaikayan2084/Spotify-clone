"use client";

import { Music2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user?: { display_name: string; image?: string };
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "spotify_access_token=; max-age=0; path=/";
    document.cookie = "spotify_refresh_token=; max-age=0; path=/";
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <Music2 className="w-6 h-6 text-green-500" />
        <span className="text-lg font-bold text-white">Stats.fm</span>
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">{user.display_name}</span>
          {user.image && (
            <img
              src={user.image}
              alt={user.display_name}
              className="w-8 h-8 rounded-full"
            />
          )}
          <button
            onClick={handleLogout}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
}
