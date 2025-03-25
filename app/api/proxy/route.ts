import { NextResponse } from 'next/server';

const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL as string;
const CLIENT_ID = process.env.NEXT_PUBLIC_SUBGRAPH_CLIENT_ID as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': CLIENT_ID, // ✅ Pass the Subgraph Client ID
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Subgraph' },
      { status: 500 }
    );
  }
}
