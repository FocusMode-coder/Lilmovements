import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getSuggestedMembers } from '@/lib/social';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const members = await getSuggestedMembers(session.user.id);
    return NextResponse.json(members);

  } catch (error) {
    console.error('Get suggested members error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}