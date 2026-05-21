export interface SpotifyProfile {
  id: string;
  display_name: string;
  images: { url: string }[];
  followers: { total: number };
  country: string;
  product: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
  popularity: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
  popularity: number;
  followers: { total: number };
}

export interface SpotifyAudioFeatures {
  danceability: number;
  energy: number;
  valence: number;
  acousticness: number;
  instrumentalness: number;
  speechiness: number;
  tempo: number;
  mode: number;
}

export interface TimeRangeOption {
  label: string;
  value: "short_term" | "medium_term" | "long_term";
}

export interface TopItemProps {
  rank: number;
  name: string;
  image: string;
  subtitle: string;
  stat?: string;
}

export interface GenreData {
  name: string;
  count: number;
  color: string;
}

export interface HeatmapData {
  hour: number;
  day: number;
  value: number;
}

export interface StatsSummary {
  totalTracks: number;
  totalArtists: number;
  topGenre: string;
  totalListeningMs: number;
}
