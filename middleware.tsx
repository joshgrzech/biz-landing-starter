// middleware.ts
import { NextResponse } from "next/server";

// This defines the paths the middleware will apply to
export const config = {
  matcher: ["/preview/:path*"],
};

export function middleware(request: Request) {
  const isTinaRequest = request.headers
    .get("referer")
    ?.includes("admin/index.html");

  if (isTinaRequest) {
    return NextResponse.next();
  }

  // Respond with a 403 Forbidden or redirect if not a TinaCMS request
  return new Response("Access denied", { status: 403 });
}
