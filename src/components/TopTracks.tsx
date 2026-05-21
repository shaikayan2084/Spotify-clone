"use client";

import { SpotifyTrack } from "@/lib/types";
import { Clock, Play } from "lucide-react";

interface TopTracksProps {
  tracks: SpotifyTrack[];
}

function msToMinutes(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function TopTracks({ tracks }: TopTracksProps) {
  if (!tracks.length) {
    return (
      <div className="text-zinc-500 text-center py-12">
        No tracks found for this time period.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Top Tracks</h2>
        <Clock className="w-4 h-4 text-zinc-500" />
      </div>
      <div className="space-y-1">
        {tracks.map((track, i) => (
          <div
            key={track.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors group"
          >
            <span className="w-6 text-sm font-bold text-zinc-500 text-right">
              {i + 1}
            </span>
            <img
              src={track.album.images[0]?.url || "/placeholder.svg"}
              alt={track.album.name}
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{track.name}</p>
              <p className="text-xs text-zinc-400 truncate">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500">{msToMinutes(track.duration_ms)}</span>
              <Play className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
