import { createHash } from 'crypto';
import QRCode from 'qrcode';

/**
 * Generate unique certificate code in format: CICT-AUREX-2026-XXXX
 */
export function generateCertificateCode(): string {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  const year = new Date().getFullYear();

  return `CICT-AUREX-${year}-${timestamp}${randomPart}`.substring(0, 20);
}

/**
 * Generate SHA-256 verification hash for certificate
 */
export function generateVerificationHash(certificateCode: string): string {
  const timestamp = Date.now().toString();
  const combinedData = `${certificateCode}:${timestamp}:${process.env.JWT_SECRET || 'secret'}`;

  return createHash('sha256').update(combinedData).digest('hex');
}

/**
 * Generate QR code data URL
 */
export async function generateQRCode(
  certificateCode: string,
  verifyUrl: string,
): Promise<string | null> {
  try {
    const qrData = `${verifyUrl}?code=${certificateCode}`;
    const qrCode = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return qrCode;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
}

/**
 * Verify certificate against provided code and hash
 */
export function verifyCertificate(
  certificateCode: string,
  storedHash: string,
  verificationHash: string,
): boolean {
  return storedHash === verificationHash && certificateCode.startsWith('CICT-AUREX-');
}

/**
 * Format certificate code for display
 */
export function formatCertificateCode(code: string): string {
  return code.toUpperCase();
}
