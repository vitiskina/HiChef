'use client';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect } from 'react';
import { SignUpForm } from './components/SignUpForm';

const SignUp = () => {
  return (
    <div className="flex max-[375px]:h-none min-[380px]:h-dvh overflow-auto items-center justify-center">
      <Card className="h-fit lg:w-1/3 md:w-3/4 w-dvw m-6 md:mx-0">
        <CardHeader>
          <CardTitle className="text-2xl">
            Register to see delicious recipes
          </CardTitle>
        </CardHeader>
        <SignUpForm />
        {/* <CardFooter></CardFooter> */}
      </Card>
    </div>
  );
};

export default SignUp;
