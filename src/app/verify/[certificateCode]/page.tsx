'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface CertificateData {
  certificateCode: string;
  participant: {
    id: string;
    name: string;
    email: string;
  };
  workshop: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    organizer: {
      organizationName: string;
      logo: string | null;
    };
  };
  attendancePercentage: number;
  issuedAt: string;
  status: string;
}

export default function CertificateVerificationPage() {
  const params = useParams();
  const certificateCode = params.certificateCode as string;
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const response = await fetch(`/api/verify/${certificateCode}`);
        const data = await response.json();

        if (data.verified) {
          setCertificate(data.data);
          setVerified(true);
        } else {
          setError(data.reason || 'Certificate verification failed');
        }
      } catch (err) {
        setError('An error occurred during verification');
      } finally {
        setLoading(false);
      }
    };

    if (certificateCode) {
      verifyCertificate();
    }
  }, [certificateCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {verified && certificate ? (
          <div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Certificate Verified ✓</h1>
              <p className="text-blue-100">This certificate is authentic and valid</p>
            </div>

            <div className="p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 bg-gray-50">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                  Certificate of Completion
                </h2>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Participant Name</p>
                    <p className="text-xl font-semibold text-gray-900">{certificate.participant.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Workshop Title</p>
                    <p className="text-xl font-semibold text-gray-900">{certificate.workshop.title}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Organizer</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {certificate.workshop.organizer.organizationName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Attendance</p>
                      <p className="text-lg font-semibold text-green-600">
                        {certificate.attendancePercentage}%
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Issued Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(certificate.issuedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Certificate Code</p>
                    <p className="text-sm font-mono text-gray-900 bg-gray-100 p-2 rounded">
                      {certificate.certificateCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700">
                  <strong>Status:</strong> {certificate.status}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <p className="text-sm text-gray-500">
              The certificate code {certificateCode} could not be verified. <br />
              Please check the code and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
