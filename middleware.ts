import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api/webhook") ||
    pathname.startsWith("/api/uploadthing") ||
    pathname.startsWith("/")
  ) {
    return NextResponse.next();
  }

  return withAuth(req);
}

export const config = {
  matcher: [
    "/((?!api/uploadthing|_next|$|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
