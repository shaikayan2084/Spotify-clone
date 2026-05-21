const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

export function getAuthUrl(): string {
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "user-read-recently-played",
    "user-read-playback-state",
  ].join(" ");

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getTokens(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) throw new Error("Failed to get tokens");
  return res.json();
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<{ access_token: string; expires_in: number }> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) throw new Error("Failed to refresh token");
  return res.json();
}

async function fetchSpotify<T>(endpoint: string, accessToken: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
  return res.json();
}

export async function getProfile(accessToken: string) {
  return fetchSpotify<import("./types").SpotifyProfile>("/me", accessToken);
}

export async function getTopArtists(
  accessToken: string,
  timeRange: string = "medium_term",
  limit: number = 20
) {
  return fetchSpotify<{ items: import("./types").SpotifyArtist[] }>(
    `/me/top/artists?time_range=${timeRange}&limit=${limit}`,
    accessToken
  );
}

export async function getTopTracks(
  accessToken: string,
  timeRange: string = "medium_term",
  limit: number = 20
) {
  return fetchSpotify<{ items: import("./types").SpotifyTrack[] }>(
    `/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
    accessToken
  );
}

export async function getRecentlyPlayed(
  accessToken: string,
  limit: number = 50
) {
  return fetchSpotify<{ items: { track: import("./types").SpotifyTrack; played_at: string }[] }>(
    `/me/player/recently-played?limit=${limit}`,
    accessToken
  );
}

export async function getAudioFeatures(
  accessToken: string,
  trackIds: string[]
): Promise<import("./types").SpotifyAudioFeatures[]> {
  const ids = trackIds.join(",");
  const data = await fetchSpotify<{ audio_features: import("./types").SpotifyAudioFeatures[] }>(
    `/audio-features?ids=${ids}`,
    accessToken
  );
  return data.audio_features.filter((f) => f !== null);
}
