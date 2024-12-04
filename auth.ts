import NextAuth from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prismaDB from './libs/prismadb';
import crypto from 'crypto-js';

import { formLoginSchema } from '@/app/(auth)/sign-in/components/SignInForm';
import type { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { ZodError } from 'zod';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaDB),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const user = await prismaDB.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          const passwordDecrypt = crypto.AES.decrypt(
            user?.password as string,
            'secretKey'
          ).toString(crypto.enc.Utf8);

          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error('Invalid credentials.');
          }

          console.log(passwordDecrypt, credentials.password, 'lalala');
          if (credentials.password !== passwordDecrypt) {
            throw new Error('Invalid email or password');
          }

          // return user object with their profile data
          return user;
        } catch (error) {
          console.log(error);
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }

          return null;
        }
      },
    }),
  ],
});
