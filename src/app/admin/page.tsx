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

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== 'ADMIN') {
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
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Users</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Total registered users</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Workshops</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Active workshops</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificates</h3>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Issued certificates</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/users"
              className="bg-blue-50 border border-blue-200 hover:bg-blue-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-blue-900">Manage Users</h3>
              <p className="text-sm text-blue-700">View and manage user accounts</p>
            </Link>

            <Link
              href="/admin/workshops"
              className="bg-green-50 border border-green-200 hover:bg-green-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-green-900">Manage Workshops</h3>
              <p className="text-sm text-green-700">Oversee all workshops</p>
            </Link>

            <Link
              href="/admin/certificates"
              className="bg-purple-50 border border-purple-200 hover:bg-purple-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-purple-900">Certificates</h3>
              <p className="text-sm text-purple-700">Manage certificates</p>
            </Link>

            <Link
              href="/admin/reports"
              className="bg-orange-50 border border-orange-200 hover:bg-orange-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-orange-900">Reports</h3>
              <p className="text-sm text-orange-700">View system reports</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
