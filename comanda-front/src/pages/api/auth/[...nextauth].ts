import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

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
      async authorize(credentials) {
        return await new Promise(() => true);
      },
    }),
  ],
  jwt: {},
  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = null; // TODO: implement the endpoint
            break;
          case 'credentials':
            token.user = user;
        }
      }
      return token;
    },
    async session({session, token, user}) {
        session.accessToken = token.accessToken as string;
        session.user = token.user as any
        return session;
    }
  },
};

export default NextAuth(authOptions);
