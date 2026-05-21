import { NextRequest, NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/spotify";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("spotify_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const data = await getRecentlyPlayed(token);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch recently played" }, { status: 500 });
  }
}
