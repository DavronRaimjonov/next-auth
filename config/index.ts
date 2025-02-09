import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { SessionStrategy } from "next-auth";
import { AuthOptions } from "next-auth";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Name or Password",
      credentials: {
        name: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://localhost:3000/api", {
            name: credentials?.name,
            password: credentials?.password,
          });
          const user = res.data;
          if (res.status === 200 && user) {
            return user;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      session.user = {
        name: token.name,
        email: token.email,
        picture: token.picture,
        ...token,
      };
      return session;
    },
    async jwt({ token, user }) {
      const data = {
        ...user,
        ...token,
      };
      return data;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 1 * 60 * 60,
  },
};
