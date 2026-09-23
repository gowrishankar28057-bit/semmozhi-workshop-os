'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Semmozhi</h1>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-600">{user?.name}</span>
                <Link
                  href="/dashboard"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Welcome to Semmozhi Workshop OS</h2>
          <p className="text-xl mb-8">
            A comprehensive Learning Management System for organizing, managing, and tracking workshops with automated certificate generation.
          </p>
          {!isLoggedIn && (
            <div className="flex justify-center gap-4">
              <Link
                href="/auth/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/auth/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-xl font-bold mb-2">Workshop Management</h4>
              <p className="text-gray-600">
                Create, manage, and organize workshops with ease. Set schedules, track attendance, and manage participants.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">✓</div>
              <h4 className="text-xl font-bold mb-2">Attendance Tracking</h4>
              <p className="text-gray-600">
                Automatically track attendance, calculate percentages, and determine certificate eligibility (90% minimum).
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="text-xl font-bold mb-2">Certificate System</h4>
              <p className="text-gray-600">
                Automatically generate verified certificates with unique codes, QR codes, and hash verification.
              </p>
            </div>

            <div className="bg-orange-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">👥</div>
              <h4 className="text-xl font-bold mb-2">User Roles</h4>
              <p className="text-gray-600">
                Admin, Organizer, and Participant roles with role-based access control and custom dashboards.
              </p>
            </div>

            <div className="bg-red-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-bold mb-2">Security</h4>
              <p className="text-gray-600">
                JWT-based authentication, password hashing with bcrypt, and secure certificate verification.
              </p>
            </div>

            <div className="bg-indigo-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="text-xl font-bold mb-2">Responsive Design</h4>
              <p className="text-gray-600">
                Mobile-first, fully responsive UI built with TailwindCSS for seamless experience on all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-lg mb-8">
            Join Semmozhi today and start organizing amazing workshops or participating in learning opportunities.
          </p>
          {!isLoggedIn && (
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Create Account Now
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>&copy; 2026 Semmozhi Workshop OS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
