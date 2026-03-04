import { toSafeString } from "./signupPayload";
import {
  createUpstreamError,
  normalizeUpstreamErrorMessage,
  postJson,
} from "./upstreamRequest";

const DEFAULT_BASE_URL = "https://api.murrvy.com";
const DEFAULT_LOGIN_ENDPOINT = "/api/v1/login/";
const DEFAULT_LOGIN_URL = "https://api.murrvy.com/api/v1/login/";
const LOGIN_TIMEOUT_MS = 15000;

const getBaseUrl = () => toSafeString(process.env.MURRVY_API_BASE_URL) || DEFAULT_BASE_URL;
const getLoginEndpoint = () => toSafeString(process.env.MURRVY_LOGIN_ENDPOINT) || DEFAULT_LOGIN_ENDPOINT;
const getLoginUrl = () => {
  const explicitLoginUrl = toSafeString(process.env.MURRVY_LOGIN_URL);

  if (explicitLoginUrl) {
    return explicitLoginUrl;
  }

  try {
    return new URL(getLoginEndpoint(), getBaseUrl()).toString();
  } catch (_error) {
    return DEFAULT_LOGIN_URL;
  }
};

export const normalizeLoginPayload = (input = {}) => ({
  username: toSafeString(input.username),
  password: toSafeString(input.password),
});

export const validateLoginPayload = (payload = {}) => {
  if (!toSafeString(payload.username)) {
    return {
      isValid: false,
      message: "Username is required.",
    };
  }

  if (!toSafeString(payload.password)) {
    return {
      isValid: false,
      message: "Password is required.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

const decodeJwtPayload = (token) => {
  const safeToken = toSafeString(token);
  const tokenParts = safeToken.split(".");

  if (tokenParts.length < 2) {
    return null;
  }

  try {
    const encodedPayload = tokenParts[1];
    const decodedPayload = Buffer.from(encodedPayload, "base64url").toString("utf8");
    return JSON.parse(decodedPayload);
  } catch (_error) {
    return null;
  }
};

const getTokenExpiryEpochMs = (token) => {
  const payload = decodeJwtPayload(token);
  const exp = Number(payload?.exp);

  if (!Number.isFinite(exp) || exp <= 0) {
    return null;
  }

  return exp * 1000;
};

export const loginWithMurrvy = async (payload = {}) => {
  const normalizedPayload = normalizeLoginPayload(payload);
  const validation = validateLoginPayload(normalizedPayload);

  if (!validation.isValid) {
    const validationError = new Error(validation.message);
    validationError.status = 400;
    throw validationError;
  }

  const url = getLoginUrl();

  try {
    const data = await postJson({
      url,
      body: normalizedPayload,
      timeoutMs: LOGIN_TIMEOUT_MS,
      fallbackErrorMessage: "Unable to login.",
    });

    const user = data?.data;
    const accessToken = toSafeString(user?.access_token);
    const tokenType = toSafeString(user?.token_type || "bearer").toLowerCase();
    const accessTokenExpiresAt = getTokenExpiryEpochMs(accessToken);
    const isSuccess = data?.status === true && user;

    if (!isSuccess) {
      throw createUpstreamError({
        message: data?.message || "Unable to login.",
        status: 500,
        payload: data,
      });
    }

    if (!accessToken) {
      throw createUpstreamError({
        message: "Login response did not contain access token.",
        status: 500,
        payload: data,
      });
    }

    return {
      message: data?.message || "User login successful.",
      accessToken,
      tokenType,
      accessTokenExpiresAt,
      user: {
        id: String(user?.user_id ?? user?.id ?? user?.username ?? normalizedPayload.username),
        user_id: user?.user_id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        name:
          user?.name ||
          `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
          normalizedPayload.username,
        username: user?.username ?? normalizedPayload.username,
        mobile_number: user?.mobile_number,
        address1: user?.address1,
        address2: user?.address2,
        city: user?.city,
        state: user?.state,
        country: user?.country,
        pincode: user?.pincode,
        role: user?.role ?? "user",
        date_created: user?.date_created,
        date_modified: user?.date_modified,
      },
    };
  } catch (error) {
    const loginError = new Error(
      normalizeUpstreamErrorMessage(error, "Unable to login. Please try again."),
    );
    loginError.status = error?.status || 500;
    throw loginError;
  }
};
