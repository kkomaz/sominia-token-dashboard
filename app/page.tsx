'use client';
import TokenTransfers from './components/TokenTransfer';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="text-indigo-600">MyToken</span> Dashboard
        </h1>
        <TokenTransfers />
      </div>
    </main>
  );
}
