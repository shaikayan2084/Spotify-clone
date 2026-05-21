import { NextRequest, NextResponse } from "next/server";
import { getTopArtists } from "@/lib/spotify";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("spotify_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const timeRange = req.nextUrl.searchParams.get("time_range") || "medium_term";
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20");

  try {
    const data = await getTopArtists(token, timeRange, limit);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}
