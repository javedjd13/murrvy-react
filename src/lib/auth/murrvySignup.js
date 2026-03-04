import { normalizeSignupPayload, toSafeString } from "./signupPayload";
import {
  createUpstreamError,
  normalizeUpstreamErrorMessage,
  postJson,
} from "./upstreamRequest";

const requiredFieldRules = [
  { key: "first_name", label: "First name" },
  { key: "last_name", label: "Last name" },
  { key: "username", label: "Username" },
  { key: "mobile_number", label: "Mobile number" },
  { key: "password", label: "Password" },
  { key: "address1", label: "Address line 1" },
  { key: "address2", label: "Address line 2" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" },
  { key: "pincode", label: "Pincode" },
];

const DEFAULT_BASE_URL = "https://api.murrvy.com";
const DEFAULT_SIGNUP_ENDPOINT = "/api/v1/user/";
const DEFAULT_SIGNUP_URL = "https://api.murrvy.com/api/v1/user/";
const SIGNUP_TIMEOUT_MS = 15000;

const getBaseUrl = () => toSafeString(process.env.MURRVY_API_BASE_URL) || DEFAULT_BASE_URL;
const getSignupEndpoint = () =>
  toSafeString(process.env.MURRVY_USER_SIGNUP_ENDPOINT) || DEFAULT_SIGNUP_ENDPOINT;
const getSignupUrl = () => {
  const explicitSignupUrl = toSafeString(process.env.MURRVY_USER_SIGNUP_URL);

  if (explicitSignupUrl) {
    return explicitSignupUrl;
  }

  try {
    return new URL(getSignupEndpoint(), getBaseUrl()).toString();
  } catch (_error) {
    return DEFAULT_SIGNUP_URL;
  }
};

export const validateSignupPayload = (payload = {}) => {
  const missingField = requiredFieldRules.find(({ key }) => !toSafeString(payload[key]));
  if (missingField) {
    return {
      isValid: false,
      message: `${missingField.label} is required.`,
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toSafeString(payload.username))) {
    return {
      isValid: false,
      message: "Username must be a valid email address.",
    };
  }

  if (!/^[0-9]{10,15}$/.test(toSafeString(payload.mobile_number))) {
    return {
      isValid: false,
      message: "Mobile number must be 10 to 15 digits.",
    };
  }

  if (toSafeString(payload.password).length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters.",
    };
  }

  if (!/^[0-9]{4,10}$/.test(toSafeString(payload.pincode))) {
    return {
      isValid: false,
      message: "Pincode must be 4 to 10 digits.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

export const signupWithMurrvy = async (payload = {}) => {
  const normalizedPayload = normalizeSignupPayload(payload);
  const validation = validateSignupPayload(normalizedPayload);

  if (!validation.isValid) {
    const validationError = new Error(validation.message);
    validationError.status = 400;
    throw validationError;
  }

  const url = getSignupUrl();

  try {
    const data = await postJson({
      url,
      body: normalizedPayload,
      timeoutMs: SIGNUP_TIMEOUT_MS,
      fallbackErrorMessage: "Unable to complete signup.",
    });

    const user = data?.data;
    const isSuccess = data?.status === true && user;

    if (!isSuccess) {
      throw createUpstreamError({
        message: data?.message || "Unable to create user.",
        status: 500,
        payload: data,
      });
    }

    return {
      message: data?.message || "User created successfully.",
      user: {
        id: String(user?.user_id ?? user?.id ?? user?.username ?? normalizedPayload.username),
        user_id: user?.user_id,
        first_name: user?.first_name ?? normalizedPayload.first_name,
        last_name: user?.last_name ?? normalizedPayload.last_name,
        name:
          user?.name ||
          `${user?.first_name ?? normalizedPayload.first_name} ${user?.last_name ?? normalizedPayload.last_name}`.trim(),
        username: user?.username ?? normalizedPayload.username,
        mobile_number: user?.mobile_number ?? normalizedPayload.mobile_number,
        address1: user?.address1 ?? normalizedPayload.address1,
        address2: user?.address2 ?? normalizedPayload.address2,
        city: user?.city ?? normalizedPayload.city,
        state: user?.state ?? normalizedPayload.state,
        country: user?.country ?? normalizedPayload.country,
        pincode: user?.pincode ?? normalizedPayload.pincode,
        role: user?.role ?? "user",
        date_created: user?.date_created,
        date_modified: user?.date_modified,
      },
    };
  } catch (error) {
    const signupError = new Error(
      normalizeUpstreamErrorMessage(error, "Unable to complete signup. Please try again."),
    );
    signupError.status = error?.status || 500;
    throw signupError;
  }
};
