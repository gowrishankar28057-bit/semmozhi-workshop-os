export function createCertificateCode(
  now = new Date(),
  id = crypto.randomUUID(),
): string {
  const year = now.getUTCFullYear();
  return `SWO-${year}-${id.replaceAll("-", "").slice(0, 12).toUpperCase()}`;
}
