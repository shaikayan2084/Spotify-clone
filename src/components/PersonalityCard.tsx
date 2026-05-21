"use client";

import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { Download, Share2, Loader2 } from "lucide-react";
import { SpotifyArtist, SpotifyTrack, GenreData } from "@/lib/types";

interface PersonalityCardProps {
  userName: string;
  topArtist: SpotifyArtist | null;
  topTrack: SpotifyTrack | null;
  topGenre: GenreData | null;
  totalTracks: number;
  mood: string;
}

export default function PersonalityCard({
  userName,
  topArtist,
  topTrack,
  topGenre,
  totalTracks,
  mood,
}: PersonalityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const handleExport = useCallback(async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#09090b",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = "my-spotify-personality.png";
      link.href = canvas.toDataURL();
      link.click();
    } catch {
      // silent fail
    }
    setExporting(false);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">Your Music Personality</h2>

      <div
        ref={cardRef}
        className="relative w-full max-w-sm mx-auto bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-2xl p-6 border border-zinc-800 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-500 uppercase tracking-widest font-medium">
              STATS.FM
            </span>
          </div>

          <p className="text-2xl font-bold text-white mb-1">{userName}</p>
          <p className="text-xs text-zinc-500 mb-6">Music Personality Report</p>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Top Artist</p>
              <p className="text-base font-bold text-white truncate">
                {topArtist?.name || "N/A"}
              </p>
              {topArtist?.genres?.length && (
                <p className="text-xs text-zinc-400">{topArtist.genres.slice(0, 2).join(", ")}</p>
              )}
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Top Track</p>
              <p className="text-sm font-semibold text-white truncate">
                {topTrack?.name || "N/A"}
              </p>
              <p className="text-xs text-zinc-400 truncate">
                {topTrack?.artists?.map((a) => a.name).join(", ") || ""}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Top Genre</p>
                <p className="text-sm font-bold text-white">{topGenre?.name || "N/A"}</p>
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Vibe</p>
                <p className="text-sm font-bold text-white">{mood}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">
                Total Tracks Analyzed
              </p>
              <p className="text-lg font-bold text-white">{totalTracks.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleExport}
        disabled={exporting}
        className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-green-500 hover:bg-green-400 text-black font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        {exporting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {exporting ? "Exporting..." : "Save as Image"}
      </button>
    </div>
  );
}
