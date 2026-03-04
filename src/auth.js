import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/nextAuthOptions";

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
