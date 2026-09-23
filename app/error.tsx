"use client";
export default function ErrorPage({ reset }: { reset(): void }) {
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <div>
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <button
          onClick={reset}
          className="mt-4 rounded-full bg-maroon px-5 py-3 text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
