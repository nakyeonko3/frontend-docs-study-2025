"use client";

export default function MaintenanceError() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-blue-50">
      <div className="text-center max-w-2xl px-8 py-10 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-24 h-24 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          We're Down for Maintenance
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We're currently improving our system to serve you better. We'll be
          back shortly.
        </p>
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 font-medium">
            Expected to be back:{" "}
            <span className="font-bold">April 21, 2025 at 2:00 PM UTC</span>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-500 text-sm mb-4">
            If you need immediate assistance, please contact:
          </p>
          <a
            href="mailto:support@example.com"
            className="text-blue-500 hover:text-blue-700"
          >
            support@example.com
          </a>
        </div>
      </div>
    </main>
  );
}
