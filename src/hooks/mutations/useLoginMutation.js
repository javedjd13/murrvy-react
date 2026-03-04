import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { normalizeLoginPayload } from "@/lib/auth/murrvyLogin";

const LOGIN_SUCCESS_REDIRECT = "/page/checkout";

export const mapLoginFormToPayload = (values = {}) =>
  normalizeLoginPayload({
    username: values?.username ?? values?.email,
    password: values?.password,
  });

const normalizeSignInError = (response) => {
  const errorCode = response?.error;
  if (!errorCode) {
    return "Unable to complete login. Please try again.";
  }

  if (typeof errorCode === "string" && errorCode.trim().length > 0) {
    try {
      return decodeURIComponent(errorCode);
    } catch (error) {
      return errorCode;
    }
  }

  return "Unable to complete login. Please try again.";
};

const useLoginMutation = () =>
  useMutation({
    mutationFn: async (formValues) => {
      const payload = mapLoginFormToPayload(formValues);
      const response = await signIn("murrvy-login", {
        redirect: false,
        callbackUrl: LOGIN_SUCCESS_REDIRECT,
        ...payload,
      });

      if (!response) {
        throw new Error("Unable to reach authentication service. Please try again.");
      }

      if (!response?.ok) {
        throw new Error(normalizeSignInError(response));
      }

      return {
        callbackUrl: response?.url || LOGIN_SUCCESS_REDIRECT,
      };
    },
  });

export default useLoginMutation;
