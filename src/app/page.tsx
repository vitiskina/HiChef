'use client';
import { useEffect } from 'react';
import { getLS, KEYS } from '../../utils/localStorageService';
import { redirect } from 'next/navigation';

const SetupPage = () => {
  useEffect(() => {
    const userId = getLS(KEYS.USER_ID);

    if (!userId) {
      return redirect('/login');
    }
  }, []);
  return <div>SetupPage</div>;
};

export default SetupPage;
