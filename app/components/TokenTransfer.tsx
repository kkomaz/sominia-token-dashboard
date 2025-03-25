'use client';
import { useEffect, useState } from 'react';

export default function TokenTransfers() {
  // Store transfers in state
  const [transfers, setTransfers] = useState<any[]>([]);

  // Track loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransfers() {
      setLoading(true); // Show loading state

      const query = `
        {
          transfers(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
            id
            from
            to
            value
            blockTimestamp
            transactionHash
          }
        }
      `;

      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const { data } = await response.json();
      setTransfers(data.transfers || []); // Store results in state
      setLoading(false); // Hide loading state
    }

    fetchTransfers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Latest Token Transfers</h2>

      {loading ? (
        <p>Loading transfers...</p>
      ) : (
        <ul>
          {transfers.map((transfer) => (
            <li key={transfer.id} className="mb-2 p-2 border rounded-lg">
              <p>
                <strong>From:</strong> {transfer.from}
              </p>
              <p>
                <strong>To:</strong> {transfer.to}
              </p>
              <p>
                <strong>Value:</strong> {parseFloat(transfer.value) / 1e18} STT
              </p>
              <p>
                <strong>TX:</strong>{' '}
                <a
                  href={`https://shannon-explorer.somnia.network/tx/${transfer.transactionHash}`}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View Transaction
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
