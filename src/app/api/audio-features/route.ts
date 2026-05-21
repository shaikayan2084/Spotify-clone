import { NextRequest, NextResponse } from "next/server";
import { getAudioFeatures } from "@/lib/spotify";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("spotify_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const ids = req.nextUrl.searchParams.get("ids");
  if (!ids) {
    return NextResponse.json({ error: "No track IDs provided" }, { status: 400 });
  }

  try {
    const data = await getAudioFeatures(token, ids.split(","));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch audio features" }, { status: 500 });
  }
}
