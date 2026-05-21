import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/spotify";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("spotify_refresh_token")?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const { access_token, expires_in } = await refreshAccessToken(refreshToken);

    const response = NextResponse.json({ success: true });

    response.cookies.set("spotify_access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }
}
