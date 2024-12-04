'use server';

import { signIn, signOut } from '@/auth';
import prismaDB from '../libs/prismadb';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import toast from 'react-hot-toast';

const getUserByEmail = async (email: string) => {
  try {
    const user = await prismaDB.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
  revalidatePath('/');
};

export const logout = async () => {
  await signOut({ redirectTo: '/' });
  revalidatePath('/');
};

export const loginWithCreds = async (formData: any) => {
  const rawFormData = {
    email: formData.email,
    password: formData.password,
    redirectTo: '/dashboard',
  };

  // const existingUser = await getUserByEmail(formData.get('email') as string);
  // console.log(existingUser);

  try {
    await signIn('credentials', rawFormData);
  } catch (error: any) {
    if (error instanceof AuthError) {
    }
    throw error;
  }

  // revalidatePath('/dashboard');
};
