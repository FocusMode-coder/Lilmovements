import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getContactRequests } from '@/lib/social';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requests = await getContactRequests(session.user.id);
    return NextResponse.json(requests);

  } catch (error) {
    console.error('Get contact requests error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}