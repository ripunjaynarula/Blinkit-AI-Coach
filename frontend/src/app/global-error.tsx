'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Critical Error</h2>
          <p className="text-xs text-slate-500">{error.message || 'Application encountered a critical error.'}</p>
          <button
            onClick={() => reset()}
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-emerald-700 transition-colors"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
