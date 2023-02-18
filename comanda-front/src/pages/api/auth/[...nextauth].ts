import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider(
        { 
            name: 'Credentials'
        }
        )
    ],
};

export default NextAuth(authOptions);