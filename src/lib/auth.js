import { jwtDecode } from "jwt-decode";

/**
 * Client-side auth helpers.
 *
 * The access token is stored JSON-stringified under "accessToken" (see
 * AuthContext.login). Its payload carries `roles`; the first role decides
 * where a user belongs — the same rule the login flow uses for redirects.
 *
 * NOTE: this only controls what the UI shows. The backend must still reject
 * admin API calls from non-admin tokens.
 */

export const ROLES = {
  ADMIN: "ROLE_ADMIN",
  USER: "ROLE_USER",
};

const TOKEN_KEY = "accessToken";

export const getAccessToken = () => {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const token = JSON.parse(raw);
    return typeof token === "string" && token ? token : null;
  } catch {
    return null;
  }
};

export const clearAccessToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
};

/**
 * Decodes the stored token. Returns null when there is no token, it cannot
 * be decoded, or it has expired (an expired/invalid token is also removed).
 */
export const getCurrentUser = () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const payload = jwtDecode(token);
    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      clearAccessToken();
      return null;
    }
    return payload;
  } catch {
    clearAccessToken();
    return null;
  }
};

/** Primary role of a decoded token — matches the login redirect rule. */
export const getPrimaryRole = (user) =>
  Array.isArray(user?.roles) ? user.roles[0] : undefined;

export const isAdmin = (user) => getPrimaryRole(user) === ROLES.ADMIN;
