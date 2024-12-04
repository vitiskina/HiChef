import { auth } from '@/auth';
import { useSession } from 'next-auth/react';
import React from 'react';
import { logout } from '../../../../actions/auth';
import { Button } from '@/components/ui/button';
import LogoutButton from './LogoutButton';

const Dashboard = async () => {
  const session = await auth();
  console.log(session);
  if (session?.user) {
    return (
      <>
        <p> You are an admin, welcome!</p>
        <LogoutButton />
      </>
    );
  }
  return <div>dashboard</div>;
};

export default Dashboard;
