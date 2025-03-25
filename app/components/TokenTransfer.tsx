'use client';
import { useEffect, useState } from 'react';

export default function TokenTransfers() {
  const [transfers, setTransfers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransfers() {
      setLoading(true);
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
      setTransfers(data.transfers || []);
      setLoading(false);
    }

    fetchTransfers();
  }, []);

  return (
    <div className="relative bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Banner */}
      <div
        className="h-32 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://pbs.twimg.com/profile_banners/1757553204747972608/1732179198/1500x500')`,
        }}
      ></div>

      {/* Logo */}
      <div className="absolute top-16 left-6">
        <img
          src="https://pbs.twimg.com/profile_images/1896736794810458112/9tsFttK2_400x400.jpg"
          alt="MyToken Logo"
          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* Content */}
      <div className="pt-16 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-indigo-600">Latest Token Transfers</span>
          <span className="text-sm font-normal text-gray-500">
            (Last 10 transactions)
          </span>
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600">Loading transfers...</span>
          </div>
        ) : transfers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No transfers found</p>
        ) : (
          <div className="grid gap-4">
            {transfers.map((transfer) => (
              <div
                key={transfer.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">From:</span>{' '}
                      <span className="font-mono text-xs break-all">
                        {transfer.from}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium text-gray-800">To:</span>{' '}
                      <span className="font-mono text-xs break-all">
                        {transfer.to}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">Value:</span>{' '}
                      <span className="text-indigo-600 font-semibold">
                        {(parseFloat(transfer.value) / 1e18).toFixed(4)} STT
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium text-gray-800">TX:</span>{' '}
                      <a
                        href={`https://shannon-explorer.somnia.network/tx/${transfer.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 underline text-xs"
                      >
                        View on Explorer
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
