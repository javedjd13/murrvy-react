import CredentialsProvider from "next-auth/providers/credentials";
import { signupWithMurrvy } from "@/lib/auth/murrvySignup";
import { loginWithMurrvy } from "@/lib/auth/murrvyLogin";

const isProduction = process.env.NODE_ENV === "production";
const DEFAULT_DEV_SECRET = "dev-only-auth-secret-change-in-production";

const resolvedAuthSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
const trustHost = (process.env.AUTH_TRUST_HOST || "true") === "true";

if (!resolvedAuthSecret && isProduction) {
  throw new Error("AUTH_SECRET is missing. Configure AUTH_SECRET for secure production sessions.");
}

const signupCredentials = {
  first_name: { label: "First name", type: "text" },
  last_name: { label: "Last name", type: "text" },
  username: { label: "Username", type: "text" },
  mobile_number: { label: "Mobile number", type: "text" },
  password: { label: "Password", type: "password" },
  address1: { label: "Address line 1", type: "text" },
  address2: { label: "Address line 2", type: "text" },
  city: { label: "City", type: "text" },
  state: { label: "State", type: "text" },
  country: { label: "Country", type: "text" },
  pincode: { label: "Pincode", type: "text" },
};

const loginCredentials = {
  username: { label: "Username", type: "text" },
  password: { label: "Password", type: "password" },
};

const buildProviderUser = (user = {}) => ({
  id: String(user?.id ?? user?.user_id ?? ""),
  user_id: user?.user_id,
  first_name: user?.first_name,
  last_name: user?.last_name,
  name: user?.name,
  username: user?.username,
  mobile_number: user?.mobile_number,
  address1: user?.address1,
  address2: user?.address2,
  city: user?.city,
  state: user?.state,
  country: user?.country,
  pincode: user?.pincode,
  role: user?.role,
  date_created: user?.date_created,
  date_modified: user?.date_modified,
});

export const authOptions = {
  trustHost,
  secret: resolvedAuthSecret || DEFAULT_DEV_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/page/login",
  },
  providers: [
    CredentialsProvider({
      id: "murrvy-signup",
      name: "Murrvy Signup",
      credentials: signupCredentials,
      authorize: async (credentials = {}) => {
        try {
          const result = await signupWithMurrvy(credentials);
          return {
            id: String(result?.user?.id ?? result?.user?.user_id ?? ""),
            user: buildProviderUser(result?.user),
            sessionSource: "signup",
            accessToken: null,
            tokenType: null,
            accessTokenExpiresAt: null,
          };
        } catch (error) {
          throw new Error(error?.message || "Unable to complete signup.");
        }
      },
    }),
    CredentialsProvider({
      id: "murrvy-login",
      name: "Murrvy Login",
      credentials: loginCredentials,
      authorize: async (credentials = {}) => {
        try {
          const result = await loginWithMurrvy(credentials);
          return {
            id: String(result?.user?.id ?? result?.user?.user_id ?? ""),
            user: buildProviderUser(result?.user),
            sessionSource: "login",
            accessToken: result?.accessToken,
            tokenType: result?.tokenType,
            accessTokenExpiresAt: result?.accessTokenExpiresAt,
          };
        } catch (error) {
          throw new Error(error?.message || "Unable to complete login.");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user?.user || null;
        token.sessionSource = user?.sessionSource || null;
        token.accessToken = typeof user?.accessToken === "string" ? user.accessToken : null;
        token.tokenType = typeof user?.tokenType === "string" ? user.tokenType : null;
        token.accessTokenExpiresAt =
          typeof user?.accessTokenExpiresAt === "number" ? user.accessTokenExpiresAt : null;
        token.authError = null;
      }

      const expiresAt = Number(token?.accessTokenExpiresAt);
      const isAccessTokenExpired =
        Boolean(token?.accessToken) && Number.isFinite(expiresAt) && Date.now() >= expiresAt;

      if (isAccessTokenExpired) {
        token.accessToken = null;
        token.tokenType = null;
        token.accessTokenExpiresAt = null;
        token.authError = "AccessTokenExpired";
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        session.user = token.user;
      }

      session.accessToken = typeof token?.accessToken === "string" ? token.accessToken : null;
      session.tokenType = typeof token?.tokenType === "string" ? token.tokenType : null;
      session.accessTokenExpiresAt =
        typeof token?.accessTokenExpiresAt === "number" ? token.accessTokenExpiresAt : null;
      session.sessionSource = token?.sessionSource || null;
      session.authError = token?.authError || null;

      return session;
    },
  },
};
