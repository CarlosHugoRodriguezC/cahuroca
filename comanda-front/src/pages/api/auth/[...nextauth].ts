import { AuthResponse } from '@/types/shared';
import jwtDecode from 'jwt-decode';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comandaApi } from '../../../api/comandaApi';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '*******',
        },
      },
      authorize: async (credentials) => {
        const { data } = await comandaApi.post<AuthResponse>(
          '/auth/login',
          credentials
        );
        // console.log(response)

        return {
          ...data.user,
          accessToken: data.token,
        };
      },
    }),
  ],
  jwt: {},

  session: {
    // maxAge: 2592000,
    strategy: 'jwt',
    // updateAge: 86400,
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
    error: '/auth/login',
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      let newToken = { ...token };
      if (user) {
        newToken = {
          ...token,
          user,
          accessTokenExpiry: jwtDecode(user.accessToken),
        };
      }
      const shouldRefreshTime = Math.round(
        newToken.accessTokenExpiry.exp - Date.now() / 1000 - 60 * 10
      );

      if (shouldRefreshTime > 0) {
        return newToken;
      }

      const {
        data: { token: refreshedToken },
      } = await comandaApi.post<AuthResponse>(
        '/auth/refresh',
        {},
        {
          headers: {
            Authorization: `Bearer ${newToken.accessToken}`,
          },
        }
      );

      return {
        ...newToken,
        accessToken: refreshedToken,
        accessTokenExpiry: jwtDecode(refreshedToken),
      };
    },
    session: async ({ session, token, user }) => {
      const { accessToken, user: userToken } = token;
      const newSession = { ...session, accessToken, user: userToken };

      return newSession;
    },
  },
};

export default NextAuth(authOptions);
