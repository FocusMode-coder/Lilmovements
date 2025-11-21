import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getConversationsWithLastMessage } from '@/lib/social';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conversations = await getConversationsWithLastMessage(session.user.id);
    return NextResponse.json(conversations);

  } catch (error) {
    console.error('Get conversations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}