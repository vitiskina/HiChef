'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import React from 'react';

import { LoginForm } from './components/LoginForm';

const Login = () => {
  return (
    <div className="flex h-screen overflow-auto items-center justify-center">
      <Card className="lg:w-1/3 md:w-3/4 w-dvw mx-6 md:mx-0">
        <CardHeader>
          <CardTitle className="text-2xl">
            Login to see delicious recipes
          </CardTitle>
        </CardHeader>
        <LoginForm />
        {/* <CardFooter></CardFooter> */}
      </Card>
    </div>
  );
};

export default Login;
