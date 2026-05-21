import Link from "next/link";
import { Music2, BarChart3, Users, ImageDown } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Music2 className="w-6 h-6 text-green-500" />
          <span className="text-lg font-bold">Stats.fm</span>
        </div>
        <Link
          href="/api/auth/login"
          className="px-5 py-2 bg-green-500 hover:bg-green-400 text-black font-medium rounded-full text-sm transition-colors"
        >
          Connect Spotify
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400 font-medium uppercase tracking-wider">
            Spotify Analytics
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          Your Spotify listening
          <br />
          <span className="text-green-500">deeply analyzed</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
          Discover your top tracks, artists, genres, and listening patterns.
          Get a shareable music personality card.
        </p>

        <Link
          href="/api/auth/login"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full text-lg transition-all hover:scale-105"
        >
          <Music2 className="w-5 h-5" />
          Connect with Spotify
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-left">
            <BarChart3 className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-bold mb-1">Deep Analytics</h3>
            <p className="text-sm text-zinc-400">
              Top tracks, artists, and genres by 4 weeks, 6 months, or all time.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-left">
            <Users className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-bold mb-1">Mood & Patterns</h3>
            <p className="text-sm text-zinc-400">
              Listening heatmaps, genre diversity, and audio feature analysis.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-left">
            <ImageDown className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-bold mb-1">Shareable Card</h3>
            <p className="text-sm text-zinc-400">
              Export your music personality as an image and share it anywhere.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
