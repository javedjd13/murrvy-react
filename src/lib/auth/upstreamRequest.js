import axios from "axios";
import { toSafeString } from "./signupPayload";

const DEFAULT_TIMEOUT_MS = 15000;

const normalizeFastApiDetail = (detail) => {
  if (typeof detail === "string" && detail.trim().length > 0) {
    return detail;
  }

  if (!Array.isArray(detail)) {
    return null;
  }

  const detailMessages = detail
    .map((item) => {
      if (typeof item === "string" && item.trim().length > 0) {
        return item;
      }

      if (!item || typeof item !== "object") {
        return "";
      }

      const location = Array.isArray(item?.loc) ? item.loc.join(".") : "";
      const message = toSafeString(item?.msg || item?.message);

      if (!message) {
        return "";
      }

      return location ? `${location}: ${message}` : message;
    })
    .filter(Boolean);

  return detailMessages.length > 0 ? detailMessages.join(", ") : null;
};

export const getUpstreamMessageFromPayload = (payload) => {
  const detailMessage = normalizeFastApiDetail(payload?.detail);
  if (detailMessage) {
    return detailMessage;
  }

  const message = payload?.message;
  return typeof message === "string" && message.trim().length > 0 ? message : null;
};

export const createUpstreamError = ({ message, status, payload }) => {
  const error = new Error(message);
  error.status = status;
  error.payload = payload;
  return error;
};

export const normalizeUpstreamErrorMessage = (error, fallbackMessage) => {
  const payloadMessage = getUpstreamMessageFromPayload(error?.payload);
  if (payloadMessage) {
    return payloadMessage;
  }

  const errorMessage = toSafeString(error?.message);
  return errorMessage || fallbackMessage;
};

export const postJson = async ({
  url,
  body,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  headers = {},
  fallbackErrorMessage = "Unable to complete request.",
}) => {
  try {
    const response = await axios.post(url, body, {
      timeout: timeoutMs,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
    });

    return response?.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    const isTimeout = error?.code === "ECONNABORTED";
    const status = isTimeout ? 408 : error?.response?.status || 500;
    const payload = error?.response?.data || null;
    const message =
      (isTimeout && "Request timeout. Please try again.") ||
      getUpstreamMessageFromPayload(payload) ||
      error?.message ||
      `${fallbackErrorMessage} Received status code ${status}.`;

    throw createUpstreamError({
      message,
      status,
      payload,
    });
  }
};
