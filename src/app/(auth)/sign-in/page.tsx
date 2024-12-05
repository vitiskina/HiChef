import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import React from 'react';
import { SignInForm } from './components/SignInForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const SignIn = async () => {
  const session = (await auth()) as Session;

  session?.user?.id && redirect('/dashboard');

  return (
    <div className="flex h-screen overflow-auto items-center justify-center px-6">
      <SignInForm />
    </div>
  );
};

export default SignIn;
