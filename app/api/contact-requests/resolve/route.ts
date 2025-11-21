import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { ContactRequestStatus } from '@prisma/client';
import { createOrFindConversation } from '@/lib/social';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { requestId, action } = await request.json();

    if (!requestId || !['accept', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Find the contact request and verify current user is the recipient
    const contactRequest = await prisma.contactRequest.findUnique({
      where: { id: requestId },
      include: {
        fromUser: { select: { id: true } }
      }
    });

    if (!contactRequest || contactRequest.toUserId !== session.user.id) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (contactRequest.status !== ContactRequestStatus.PENDING) {
      return NextResponse.json({ error: 'Request already resolved' }, { status: 400 });
    }

    let conversationId: string | undefined;

    if (action === 'accept') {
      // Update request status and create conversation
      await prisma.contactRequest.update({
        where: { id: requestId },
        data: { status: ContactRequestStatus.ACCEPTED }
      });

      const conversation = await createOrFindConversation(
        contactRequest.fromUserId,
        session.user.id
      );
      conversationId = conversation.id;

    } else {
      // Reject the request
      await prisma.contactRequest.update({
        where: { id: requestId },
        data: { status: ContactRequestStatus.REJECTED }
      });
    }

    return NextResponse.json({ ok: true, conversationId });

  } catch (error) {
    console.error('Resolve request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}