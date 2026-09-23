"use client";
import { useEffect } from "react";
export function TurnstileWidget({ onToken }: { onToken(token: string): void }) {
  useEffect(() => {
    (
      window as unknown as { onSemmozhiTurnstile?: (token: string) => void }
    ).onSemmozhiTurnstile = onToken;
  }, [onToken]);
  return (
    <div
      className="cf-turnstile"
      data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      data-callback="onSemmozhiTurnstile"
    >
      <noscript>Enable JavaScript to complete bot verification.</noscript>
    </div>
  );
}
