# Certificates

Pipeline: authoritative attendance records → shared calculation → `assertCertificateEligible` → unique certificate record/code → PDF render → object storage → QR linking to `/verify/[certificateCode]`. Eligibility is at least 90% with one or more eligible sessions. Revocation preserves the record and makes public verification invalid. Public responses expose only participant name, workshop title, issue date, code, and validity; no email or internal IDs.
