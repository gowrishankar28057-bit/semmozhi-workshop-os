# Rotating QR attendance

An authorized organizer opens attendance for an owned session. The server signs a 10–300 second token containing only session subject, issued/expiry times, and random nonce. The display refreshes before expiry. A participant submits the token through an authenticated session; the server verifies signature/expiry, registration, attendance window, and uniqueness before writing attendance. P7 must add nonce replay storage, atomic idempotency, clock-skew policy, rate limits, and organizer close controls. Secrets never enter the QR payload or browser bundle.
