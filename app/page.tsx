'use client';
import TokenTransfers from './components/TokenTransfer';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Welcome to MyToken Dashboard</h1>
      <TokenTransfers />
    </main>
  );
}
