'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { logout } from '../../../../actions/auth';

const LogoutButton = () => {
  return <Button onClick={() => logout()}>Logout</Button>;
};

export default LogoutButton;
