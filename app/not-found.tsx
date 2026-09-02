import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <SearchX className="h-8 w-8 text-gray-600" />
        </div>

        <p className="text-sm font-semibold text-gray-500">
          ERROR 404
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Page not found
        </h1>

        <p className="mt-4 text-gray-600">
          Sorry, the page you are looking for does not exist
          or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}