// Signed session cookie helpers, shared by middleware.js (checks the cookie)
// and api/login.js (issues it). Uses Web Crypto so the same code runs
// unchanged on both the Edge runtime (middleware) and a Node/Edge function
// (the login API route) — no framework, no extra crypto dependency.

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const SESSION_COOKIE = 'student_session';
export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function toBase64Url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

export async function signSession(payload, secret) {
  const key = await hmacKey(secret);
  const payloadB64 = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadB64));
  return `${payloadB64}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifySession(token, secret) {
  if (!token || !token.includes('.')) return null;
  const [payloadB64, signatureB64] = token.split('.');
  const key = await hmacKey(secret);
  const expectedSignature = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadB64));
  if (toBase64Url(new Uint8Array(expectedSignature)) !== signatureB64) return null;

  try {
    const payload = JSON.parse(decoder.decode(fromBase64Url(payloadB64)));
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function readSessionCookie(request) {
  const header = request.headers.get('cookie') || '';
  const match = header.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// STUDENTS_ALLOWLIST env var format: JSON array of { "name": "...", "code": "..." }
export function parseAllowlist() {
  const raw = process.env.STUDENTS_ALLOWLIST;
  if (!raw) return null;
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : null;
  } catch {
    return null;
  }
}
