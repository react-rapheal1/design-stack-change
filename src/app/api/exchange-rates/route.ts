import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const ALLOWED_CURRENCIES = new Set(["USD", "GBP", "EUR", "NGN", "INR", "ZAR", "KES", "CAD"]);

export async function GET(request: NextRequest) {
  const base = request.nextUrl.searchParams.get("base");

  if (!base || !ALLOWED_CURRENCIES.has(base)) {
    return NextResponse.json({ error: "Invalid currency" }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "Exchange rate service not configured" }, { status: 503 });
  }

  const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return NextResponse.json({ error: "Upstream API error" }, { status: 502 });
  }

  const data = (await res.json()) as { conversion_rates: Record<string, number> };

  return NextResponse.json({ rates: data.conversion_rates });
}
