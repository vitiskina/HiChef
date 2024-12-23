import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import prismaDB from '../../../libs/prismadb';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
