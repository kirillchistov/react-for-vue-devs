import { SESSION_COOKIE, SESSION_TTL_MS, parseAllowlist, signSession } from '../lib/auth.js';

export const config = { runtime: 'edge' };

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const form = await request.formData();
  const name = String(form.get('name') || '').trim();
  const code = String(form.get('code') || '').trim();
  const next = String(form.get('next') || '/');
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';

  const allowlist = parseAllowlist();
  const secret = process.env.SESSION_SECRET;

  const loginUrl = new URL('/login/', request.url);
  loginUrl.searchParams.set('next', safeNext);

  if (!allowlist || !secret) {
    loginUrl.searchParams.set('error', 'not_configured');
    return Response.redirect(loginUrl, 302);
  }

  const match = allowlist.find((entry) => entry.name === name && entry.code === code);
  if (!match) {
    loginUrl.searchParams.set('error', '1');
    return Response.redirect(loginUrl, 302);
  }

  const token = await signSession({ name, exp: Date.now() + SESSION_TTL_MS }, secret);
  const destination = new URL(safeNext, request.url);

  return new Response(null, {
    status: 302,
    headers: {
      Location: destination.toString(),
      'Set-Cookie': `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${Math.floor(
        SESSION_TTL_MS / 1000,
      )}`,
    },
  });
}
