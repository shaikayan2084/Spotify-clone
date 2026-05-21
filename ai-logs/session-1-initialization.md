## Prompt

I need to build a Stats.fm clone — a Spotify listening stats web app. Deep analytics for Spotify history: top artists, tracks, listening patterns, genre breakdowns, and personality insights. Key features: Spotify OAuth integration, top tracks/artists/genres by 4-week/6-month/all-time, listening time heatmap (hour of day, day of week), genre diversity and mood score, shareable personality card (image export). Build this as a Next.js project with TypeScript and Tailwind CSS. The folder name should be "spotify-stats".

## Response

I'll build the full project. Let me start by initializing Next.js, installing dependencies (recharts, lucide-react, html2canvas), and creating the complete project structure.

## Prompt

Create the project folder "spotify-stats" and initialize a Next.js app with TypeScript and Tailwind.

## Response

Created the folder and ran create-next-app with TypeScript, Tailwind, ESLint, App Router, and src/ directory.

## Prompt

Create the full project structure. I need:
1. API routes for Spotify OAuth (login, callback, refresh token)
2. API routes for Spotify data (profile, top artists, top tracks, recently played, audio features)
3. TypeScript types for all Spotify data
4. A Spotify API client library
5. Components: Navbar, StatsCard, TimeRangeSelector, TopTracks, TopArtists, GenreBreakdown, ListeningHeatmap, MoodScore, PersonalityCard
6. Dashboard page and landing page
7. Dark theme CSS

Build everything at once so it compiles with zero errors.

## Response

Created all files. Here's the structure:
- `src/lib/types.ts` — All TypeScript interfaces
- `src/lib/spotify.ts` — Spotify API client (OAuth, profile, top data, audio features)
- `src/app/api/auth/login/route.ts` — Redirects to Spotify OAuth
- `src/app/api/auth/callback/route.ts` — Handles OAuth callback, sets cookies
- `src/app/api/auth/refresh/route.ts` — Refreshes access token
- `src/app/api/me/route.ts` — Fetches user profile
- `src/app/api/top/artists/route.ts` — Top artists with time_range param
- `src/app/api/top/tracks/route.ts` — Top tracks with time_range param
- `src/app/api/recently-played/route.ts` — Recent listening history
- `src/app/api/audio-features/route.ts` — Audio features for mood analysis
- `src/components/Navbar.tsx` — User profile + logout
- `src/components/StatsCard.tsx` — Metric display card
- `src/components/TimeRangeSelector.tsx` — 4W/6M/All toggle
- `src/components/TopTracks.tsx` — Ranked track list with album art
- `src/components/TopArtists.tsx` — Artist grid with rank badges
- `src/components/GenreBreakdown.tsx` — Donut chart with legend
- `src/components/ListeningHeatmap.tsx` — Hour/day intensity grid
- `src/components/MoodScore.tsx` — Radar chart + mood label
- `src/components/PersonalityCard.tsx` — Shareable card with html2canvas export
- `src/app/dashboard/page.tsx` — Main dashboard with all analytics
- `src/app/page.tsx` — Landing page with Spotify connect CTA
- `src/app/layout.tsx` — Root layout with metadata
- `src/app/globals.css` — Dark theme styles

Built the project — zero errors on `next build`.

## Prompt

Now I need to run the app. What do I need to do next?

## Response

1. Go to https://developer.spotify.com/dashboard → Create App
2. Add Redirect URI: `http://localhost:3000/api/auth/callback`
3. Copy Client ID and Secret into `.env.local`
4. Run `npm run dev` from the project folder
5. Open `http://localhost:3000`

## Prompt

Format the AI logs properly for the 8x Engineer contest submission. The logs need clear ## Prompt and ## Response headers.

## Response

Done. This file is now formatted per the 8x Engineer AI Logs guidelines with proper Markdown headers separating prompts from responses.
