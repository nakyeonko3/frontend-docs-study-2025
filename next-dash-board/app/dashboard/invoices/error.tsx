"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Invoices Create Page Error</h2>
      <button
        className="mt-4 rounded-md bg-purple-500 px-4 py-2 text-sm text-white transition-colors hover:bg-purple-700"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
