// @ts-nocheck
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { loginUser, registerUser } from '../../../api/api';

const NETTY_URL = ' https://c6a0-37-252-93-127.ngrok-free.app/api';
// const NETTY_URL = 'https://app-api.nettyworth.io/api';

async function refreshAccessToken(tokenObject) {
  try {
    const tokenResponse = await axios.get(`${NETTY_URL}/refresh`, {
      headers: {
        Authorization: `Bearer ${tokenObject.accessToken}`,
        Cookie: `jwt=${tokenObject.jwt}`,
      },
      withCredentials: true,
    });
    const decoded = jwtDecode(tokenResponse.data.accessToken);

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      expiration: decoded.exp,
    };
  } catch (error) {
    return {
      // ...tokenObject,
      // error: 'RefreshAccessTokenError',
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'login',
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials);
          if (!user) return null;
          const decoded = jwtDecode(user.data.accessToken);

          const [cookies] = user.headers['set-cookie'];
          const jwt = cookies.slice(cookies.indexOf('jwt') + 4, cookies.indexOf(';'));

          return { ...user.data, expiration: decoded.exp, jwt };
        } catch (error) {
          console.log({ error });

          throw new Error(error);
        }
      },
    }),
    CredentialsProvider({
      id: 'signup',
      async authorize(credentials) {
        try {
          const user = await registerUser(credentials);
          return user || null;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;

      return false;
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async jwt({ token, user }) {
      const shouldRefresh = token.expiration * 1000 < new Date().getTime();

      if (!shouldRefresh) {
        return { ...token, ...user };
      }

      const newToken = await refreshAccessToken(token);
      console.log('nextAuth', process.env.NEXTAUTH_SECRET);

      return { ...newToken, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default handler;
