/**
 * Client-side JWT utilities.
 *
 * These functions decode the JWT payload locally (no crypto verification —
 * that is the backend's responsibility). They are used only to read the
 * expiration claim so the frontend can evict stale tokens before sending
 * requests, avoiding the flood of 401s / server-side "expired JWT" warnings.
 */

/**
 * Decode the payload of a JWT without verifying the signature.
 *
 * @param {string} token - A compact JWT string (header.payload.signature)
 * @returns {object|null} Decoded payload object, or null if the token is
 *   missing, structurally invalid, or cannot be base64-decoded.
 */
export function decodeJwtPayload(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    // JWT uses base64url encoding; replace chars to standard base64 then decode.
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonStr = atob(base64);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

/**
 * Return true if the token is absent, structurally invalid, or its `exp`
 * claim is in the past (with a 30-second clock-skew tolerance).
 *
 * @param {string|null} token
 * @returns {boolean}
 */
export function isTokenExpired(token) {
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') return true;

  // `exp` is seconds since epoch; Date.now() is milliseconds.
  const CLOCK_SKEW_SECONDS = 30;
  return payload.exp < Math.floor(Date.now() / 1000) - CLOCK_SKEW_SECONDS;
}
