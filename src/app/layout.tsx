import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from '../../providers/toast-provider';
import './globals.css';
import { auth } from '@/auth';

import prismaDB from '../../libs/prismadb';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>
          <ToastProvider />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
