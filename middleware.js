import { next } from '@vercel/functions';
import { readSessionCookie, verifySession } from './lib/auth.js';

// Everything except the login page itself, the login API, and the few
// static assets the login page needs must pass through the session check.
export const config = {
  matcher: ['/((?!login|api/|theme.css|site.js|search-index.json|favicon.ico).*)'],
};

export default async function middleware(request) {
  const allowlistRaw = process.env.STUDENTS_ALLOWLIST;
  const secret = process.env.SESSION_SECRET;

  // Auth not configured yet in this Vercel project — fail open so shipping
  // this code never locks anyone out before the env vars are set.
  if (!allowlistRaw || !secret) {
    return next();
  }

  const token = readSessionCookie(request);
  const session = token ? await verifySession(token, secret) : null;
  if (session) {
    return next();
  }

  const url = new URL(request.url);
  const loginUrl = new URL('/login/', url);
  loginUrl.searchParams.set('next', url.pathname + url.search);
  return Response.redirect(loginUrl, 302);
}
