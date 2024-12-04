import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prismaDB from '../../../libs/prismadb';
import React from 'react';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }

  const userId = session?.user?.id;
  const user = await prismaDB.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (user) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
