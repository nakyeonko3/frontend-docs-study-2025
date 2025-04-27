"use client";

import { useEffect } from "react";

export default function ServerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-lg px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-red-600 mb-4">500</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Server Error
        </h3>
        <p className="text-gray-600 mb-4">
          Something went wrong on our servers. Our technical team has been
          notified.
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500 mb-6 p-2 bg-gray-100 rounded">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-col space-y-4">
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            onClick={() => reset()}
          >
            Try again
          </button>
          <button
            className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-300"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
