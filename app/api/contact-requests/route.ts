import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { ContactRequestStatus } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { toUserId } = await request.json();

    if (!toUserId || toUserId === session.user.id) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Check if request already exists
    const existingRequest = await prisma.contactRequest.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: session.user.id,
          toUserId: toUserId
        }
      }
    });

    if (existingRequest) {
      return NextResponse.json({ error: 'Request already exists' }, { status: 400 });
    }

    // Create new contact request
    await prisma.contactRequest.create({
      data: {
        fromUserId: session.user.id,
        toUserId: toUserId,
        status: ContactRequestStatus.PENDING
      }
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Contact request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}