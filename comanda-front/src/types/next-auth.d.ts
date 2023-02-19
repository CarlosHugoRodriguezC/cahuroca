import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import { PartialUser } from './shared/authResponse';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    user: User;
  }
  interface User extends DefaultUser, PartialUser {
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken: string;
    accessTokenExpiry: {
      iat: number;
      exp: number;
    };
    user: User;
  }
}
