const required = [
  "DATABASE_URL",
  "DIRECT_URL",
  "AUTH_SECRET",
  "NEXT_PUBLIC_APP_URL",
] as const;
const optional = [
  "DATABASE_URL_UNPOOLED",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "CLOUDFLARE_ACCOUNT_ID",
  "ATTENDANCE_QR_SECRET",
] as const;
const missing = required.filter((key) => !process.env[key]);
console.log(
  `Configured optional variables: ${optional.filter((key) => process.env[key]).join(", ") || "none"}`,
);
if (missing.length) {
  console.error(
    `Missing required environment variables: ${missing.join(", ")}`,
  );
  process.exit(1);
}
console.log("Environment is ready.");
