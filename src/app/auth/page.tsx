'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Semmozhi</h1>
          <p className="text-gray-600">Workshop Operating System</p>
        </div>

        <p className="text-gray-700 text-center mb-8">
          Join us to participate in amazing workshops and earn certificates.
        </p>

        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center block"
          >
            Register
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center">
            Organize a workshop? <br />
            <Link href="/auth/register?role=organizer" className="text-blue-600 font-semibold hover:underline">
              Register as Organizer
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
