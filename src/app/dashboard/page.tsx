'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role === 'ADMIN') {
      router.push('/admin');
    } else if (userData.role === 'ORGANIZER') {
      router.push('/organizer');
    } else {
      router.push('/participant');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
