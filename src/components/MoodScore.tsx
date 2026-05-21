"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { SpotifyAudioFeatures } from "@/lib/types";

interface MoodScoreProps {
  features: SpotifyAudioFeatures[];
}

function averageFeatures(features: SpotifyAudioFeatures[]): { name: string; value: number }[] {
  if (!features.length) return [];
  const keys = ["danceability", "energy", "valence", "acousticness", "speechiness"] as const;
  return keys.map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: Math.round(features.reduce((sum, f) => sum + (f[key] || 0), 0) / features.length * 100),
  }));
}

function calculateMood(data: { name: string; value: number }[]): string {
  if (!data.length) return "Unknown";
  const map: Record<string, number> = {};
  data.forEach((d) => (map[d.name.toLowerCase()] = d.value));

  if (map.energy > 70 && map.valence > 60) return "Energetic & Happy";
  if (map.energy > 70 && map.valence < 40) return "Intense";
  if (map.energy < 40 && map.valence > 60) return "Chill & Happy";
  if (map.energy < 40 && map.valence < 40) return "Melancholic";
  if (map.danceability > 70) return "Dancy";
  if (map.acousticness > 60) return "Acoustic";
  return "Balanced";
}

export default function MoodScore({ features }: MoodScoreProps) {
  const data = averageFeatures(features);
  const mood = calculateMood(data);

  if (!data.length) {
    return (
      <div className="text-zinc-500 text-center py-12">
        No audio features available.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Mood Analysis</h2>
      <div className="flex flex-col items-center">
        <div className="w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="#27272a" />
              <PolarAngleAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#52525b", fontSize: 9 }} />
              <Radar dataKey="value" stroke="#1DB954" fill="#1DB954" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center">
          <span className="text-xs text-zinc-500 uppercase tracking-wider">Your Vibe</span>
          <p className="text-xl font-bold text-white">{mood}</p>
        </div>
      </div>
    </div>
  );
}
