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

export default function OrganizerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== 'ORGANIZER' && userData.role !== 'ADMIN') {
        router.push('/dashboard');
      } else {
        setUser(userData);
      }
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
          <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Workshops</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Workshops created</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Participants</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Total registrations</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificates Issued</h3>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Certificates distributed</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Workshops</h2>
            <Link
              href="/organizer/workshops/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Workshop
            </Link>
          </div>
          <p className="text-gray-500">No workshops yet. Create your first workshop to get started!</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/organizer/workshops"
              className="bg-blue-50 border border-blue-200 hover:bg-blue-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-blue-900">My Workshops</h3>
              <p className="text-sm text-blue-700">Manage your workshops</p>
            </Link>

            <Link
              href="/organizer/participants"
              className="bg-green-50 border border-green-200 hover:bg-green-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-green-900">Participants</h3>
              <p className="text-sm text-green-700">View registrations</p>
            </Link>

            <Link
              href="/organizer/attendance"
              className="bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-yellow-900">Attendance</h3>
              <p className="text-sm text-yellow-700">Track attendance</p>
            </Link>

            <Link
              href="/organizer/certificates"
              className="bg-purple-50 border border-purple-200 hover:bg-purple-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-purple-900">Certificates</h3>
              <p className="text-sm text-purple-700">Issue certificates</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
