"use client";

import { SpotifyArtist } from "@/lib/types";
import { Users } from "lucide-react";

interface TopArtistsProps {
  artists: SpotifyArtist[];
}

export default function TopArtists({ artists }: TopArtistsProps) {
  if (!artists.length) {
    return (
      <div className="text-zinc-500 text-center py-12">
        No artists found for this time period.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Top Artists</h2>
        <Users className="w-4 h-4 text-zinc-500" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {artists.slice(0, 8).map((artist, i) => (
          <div
            key={artist.id}
            className="flex flex-col items-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group cursor-pointer"
          >
            <div className="relative">
              <img
                src={artist.images[0]?.url || "/placeholder.svg"}
                alt={artist.name}
                className="w-20 h-20 rounded-full object-cover mb-3 group-hover:ring-2 ring-green-500 transition-all"
              />
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <p className="text-sm font-medium text-white text-center truncate w-full">
              {artist.name}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {artist.genres.slice(0, 1).join(", ") || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
