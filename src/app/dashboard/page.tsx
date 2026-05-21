"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Music2, Mic2, Disc3, BarChart3, Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import TimeRangeSelector from "@/components/TimeRangeSelector";
import TopTracks from "@/components/TopTracks";
import TopArtists from "@/components/TopArtists";
import GenreBreakdown from "@/components/GenreBreakdown";
import ListeningHeatmap from "@/components/ListeningHeatmap";
import MoodScore from "@/components/MoodScore";
import PersonalityCard from "@/components/PersonalityCard";
import {
  SpotifyProfile, SpotifyTrack, SpotifyArtist,
  SpotifyAudioFeatures, GenreData, HeatmapData,
} from "@/lib/types";

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [features, setFeatures] = useState<SpotifyAudioFeatures[]>([]);
  const [recentTracks, setRecentTracks] = useState<{ played_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [error, setError] = useState("");

  const fetchAll = useCallback(async (range: string) => {
    setLoading(true);
    setError("");
    try {
      const [profileRes, tracksRes, artistsRes, recentRes] = await Promise.all([
        fetch("/api/me"),
        fetch(`/api/top/tracks?time_range=${range}&limit=20`),
        fetch(`/api/top/artists?time_range=${range}&limit=20`),
        fetch("/api/recently-played"),
      ]);

      if (profileRes.status === 401) {
        router.push("/");
        return;
      }

      const profileData = await profileRes.json();
      const tracksData = await tracksRes.json();
      const artistsData = await artistsRes.json();
      let recentData = { items: [] };
      if (recentRes.ok) recentData = await recentRes.json();

      setProfile(profileData);
      setTracks(tracksData.items || []);
      setArtists(artistsData.items || []);
      setRecentTracks(recentData.items || []);

      const trackIds = (tracksData.items || []).slice(0, 10).map((t: SpotifyTrack) => t.id);
      if (trackIds.length) {
        const featuresRes = await fetch(`/api/audio-features?ids=${trackIds.join(",")}`);
        if (featuresRes.ok) {
          const featuresData = await featuresRes.json();
          setFeatures(Array.isArray(featuresData) ? featuresData : []);
        }
      }
    } catch {
      setError("Failed to load your Spotify data. Try again.");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchAll(timeRange);
  }, [timeRange, fetchAll]);

  const topArtist = artists[0] || null;
  const topTrack = tracks[0] || null;

  const genreMap: Record<string, number> = {};
  artists.forEach((a) => {
    a.genres?.forEach((g) => {
      genreMap[g] = (genreMap[g] || 0) + 1;
    });
  });
  const genres: GenreData[] = Object.entries(genreMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, count]) => ({ name, count, color: "#1DB954" }));

  const heatmapData: HeatmapData[] = useMemo(() => {
    const counts: Record<string, number> = {};
    recentTracks.forEach((item) => {
      const date = new Date(item.played_at);
      const day = date.getDay();
      const hour = date.getHours();
      const key = `${day}-${hour}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    const result: HeatmapData[] = [];
    for (let d = 0; d < 7; d++) {
      for (let h = 0; h < 24; h++) {
        const key = `${d}-${h}`;
        result.push({ day: d, hour: h, value: counts[key] || 0 });
      }
    }
    return result;
  }, [recentTracks]);

  const avgFeatures = features.length
    ? features.reduce(
        (acc, f) => {
          acc.danceability += f.danceability;
          acc.energy += f.energy;
          acc.valence += f.valence;
          acc.acousticness += f.acousticness;
          acc.speechiness += f.speechiness;
          return acc;
        },
        { danceability: 0, energy: 0, valence: 0, acousticness: 0, speechiness: 0 }
      )
    : null;
  if (avgFeatures && features.length) {
    const keys = Object.keys(avgFeatures) as (keyof typeof avgFeatures)[];
    keys.forEach((k) => { avgFeatures[k] /= features.length; });
  }

  function calculateMoodLabel(): string {
    if (!avgFeatures) return "Unknown";
    if (avgFeatures.energy > 0.7 && avgFeatures.valence > 0.6) return "Energetic & Happy";
    if (avgFeatures.energy > 0.7 && avgFeatures.valence < 0.4) return "Intense";
    if (avgFeatures.energy < 0.4 && avgFeatures.valence > 0.6) return "Chill & Happy";
    if (avgFeatures.energy < 0.4 && avgFeatures.valence < 0.4) return "Melancholic";
    if (avgFeatures.danceability > 0.7) return "Dancy";
    if (avgFeatures.acousticness > 0.6) return "Acoustic";
    return "Balanced";
  }

  const totalListeningMs = tracks.reduce((sum, t) => sum + (t.duration_ms || 0), 0);

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          <p className="text-zinc-400 text-sm">Loading your stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        user={
          profile
            ? {
                display_name: profile.display_name,
                image: profile.images?.[0]?.url,
              }
            : undefined
        }
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Your Spotify Stats</h1>
            <p className="text-sm text-zinc-500 mt-1">
              {profile?.display_name || "User"} &middot;{" "}
              {timeRange === "short_term"
                ? "Last 4 weeks"
                : timeRange === "medium_term"
                  ? "Last 6 months"
                  : "All time"}
            </p>
          </div>
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Tracks"
            value={tracks.length}
            icon={<Music2 className="w-4 h-4" />}
          />
          <StatsCard
            title="Artists"
            value={artists.length}
            icon={<Mic2 className="w-4 h-4" />}
          />
          <StatsCard
            title="Top Genre"
            value={genres[0]?.name || "N/A"}
            icon={<Disc3 className="w-4 h-4" />}
          />
          <StatsCard
            title="Listening Time"
            value={`${Math.round(totalListeningMs / 60000)}m`}
            icon={<BarChart3 className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-800">
            <TopArtists artists={artists} />
          </div>
          <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-800">
            <TopTracks tracks={tracks} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-800">
            <GenreBreakdown genres={genres} />
          </div>
          <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-800">
            <MoodScore features={features} />
          </div>
        </div>

        <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-800 mb-8">
          <ListeningHeatmap data={heatmapData} />
        </div>

        <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-800 mb-8">
          <PersonalityCard
            userName={profile?.display_name || "User"}
            topArtist={topArtist}
            topTrack={topTrack}
            topGenre={genres[0] || null}
            totalTracks={tracks.length}
            mood={calculateMoodLabel()}
          />
        </div>
      </main>
    </div>
  );
}
