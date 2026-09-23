import Link from "next/link";
export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-5xl font-black text-maroon">404</h1>
        <p className="mt-3">This page is not part of the learning path.</p>
        <Link href="/" className="mt-6 inline-block font-bold text-maroon">
          Return home
        </Link>
      </div>
    </div>
  );
}
