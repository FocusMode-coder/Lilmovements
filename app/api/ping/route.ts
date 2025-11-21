// This endpoint is used by external uptime monitoring services (like UptimeRobot or BetterStack)
// to ping the app every 5 minutes and keep the Render service warm, preventing it from spinning down.
// Keep this endpoint lightweight - no heavy operations, database calls, or complex logic.

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
}