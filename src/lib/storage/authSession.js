const AUTH_SESSION_STORAGE_KEY = "murrvyAuthSession";
export const AUTH_SESSION_CHANGE_EVENT = "murrvy:auth-session-change";

const isBrowser = () => typeof window !== "undefined";

const emitAuthSessionChange = (payload) => {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(AUTH_SESSION_CHANGE_EVENT, {
      detail: payload,
    }),
  );
};

export const getAuthSession = () => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : null;
  } catch {
    return null;
  }
};

export const setAuthSession = (sessionData = {}) => {
  if (!isBrowser()) {
    return null;
  }

  const nextSession = {
    ...(sessionData && typeof sessionData === "object" ? sessionData : {}),
    isAuthenticated: true,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(nextSession));
  emitAuthSessionChange(nextSession);
  return nextSession;
};

export const clearAuthSession = () => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  emitAuthSessionChange(null);
};

export const isUserAuthenticated = () => {
  const session = getAuthSession();
  if (!session) {
    return false;
  }

  return Boolean(
    session.isAuthenticated ||
      session.token ||
      session.access ||
      session.accessToken ||
      session.refreshToken ||
      session.user,
  );
};

export { AUTH_SESSION_STORAGE_KEY };
