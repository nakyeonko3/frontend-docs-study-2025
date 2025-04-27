"use client";

import Link from "next/link";

export default function ForbiddenError() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-lg px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-red-600 mb-4">403</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Forbidden
        </h3>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/dashboard"
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-300"
          >
            Login Again
          </Link>
        </div>
      </div>
    </main>
  );
}
