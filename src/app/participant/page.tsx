'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function ParticipantDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  if (!mounted || !user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Semmozhi - Workshop OS</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Registered Workshops</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Workshops joined</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificates Earned</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Certificates received</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance Rate</h3>
            <p className="text-3xl font-bold text-purple-600">0%</p>
            <p className="text-sm text-gray-500 mt-2">Average attendance</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Available Workshops</h2>
            <Link
              href="/workshops"
              className="text-blue-600 font-semibold hover:underline"
            >
              Browse All →
            </Link>
          </div>
          <p className="text-gray-500">No workshops registered yet. Browse available workshops to join!</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Certificates</h2>
          <p className="text-gray-500">No certificates yet. Attend workshops and maintain 90% attendance to earn certificates!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/participant/workshops"
            className="bg-blue-50 border border-blue-200 hover:bg-blue-100 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold text-blue-900 text-lg mb-2">My Workshops</h3>
            <p className="text-sm text-blue-700">View and manage registered workshops</p>
          </Link>

          <Link
            href="/participant/certificates"
            className="bg-green-50 border border-green-200 hover:bg-green-100 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold text-green-900 text-lg mb-2">My Certificates</h3>
            <p className="text-sm text-green-700">View your earned certificates</p>
          </Link>

          <Link
            href="/participant/attendance"
            className="bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold text-yellow-900 text-lg mb-2">Attendance</h3>
            <p className="text-sm text-yellow-700">Track your attendance records</p>
          </Link>

          <Link
            href="/participant/profile"
            className="bg-purple-50 border border-purple-200 hover:bg-purple-100 p-6 rounded-lg transition-colors"
          >
            <h3 className="font-semibold text-purple-900 text-lg mb-2">My Profile</h3>
            <p className="text-sm text-purple-700">Update profile information</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
