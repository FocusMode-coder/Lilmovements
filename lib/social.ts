import { prisma } from './prisma';
import { ContactRequestStatus } from '@prisma/client';

export interface SuggestedMember {
  id: string;
  name: string | null;
  createdAt: Date;
}

export interface ContactRequestWithUser {
  id: string;
  fromUser: {
    id: string;
    name: string | null;
  };
  createdAt: Date;
}

export interface ConversationWithDetails {
  id: string;
  otherParticipant: {
    id: string;
    name: string | null;
  };
  lastMessage?: {
    content: string;
    createdAt: Date;
    senderId: string;
  };
  createdAt: Date;
}

export async function getSuggestedMembers(currentUserId: string): Promise<SuggestedMember[]> {
  // Get recent members excluding current user and those already connected/requested
  const existingConnections = await prisma.contactRequest.findMany({
    where: {
      OR: [
        { fromUserId: currentUserId },
        { toUserId: currentUserId }
      ]
    },
    select: {
      fromUserId: true,
      toUserId: true
    }
  });

  const excludedUserIds = [
    currentUserId,
    ...existingConnections.flatMap(req => [req.fromUserId, req.toUserId])
  ];

  return await prisma.user.findMany({
    where: {
      id: {
        notIn: excludedUserIds
      }
    },
    select: {
      id: true,
      name: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  });
}

export async function getContactRequests(currentUserId: string): Promise<ContactRequestWithUser[]> {
  return await prisma.contactRequest.findMany({
    where: {
      toUserId: currentUserId,
      status: ContactRequestStatus.PENDING
    },
    include: {
      fromUser: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getConversationsWithLastMessage(currentUserId: string): Promise<ConversationWithDetails[]> {
  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        { participantAId: currentUserId },
        { participantBId: currentUserId }
      ]
    },
    include: {
      participantA: {
        select: {
          id: true,
          name: true
        }
      },
      participantB: {
        select: {
          id: true,
          name: true
        }
      },
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1,
        select: {
          content: true,
          createdAt: true,
          senderId: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return conversations.map(conv => {
    const otherParticipant = conv.participantAId === currentUserId 
      ? conv.participantB 
      : conv.participantA;

    return {
      id: conv.id,
      otherParticipant,
      lastMessage: conv.messages[0] || undefined,
      createdAt: conv.createdAt
    };
  });
}

export async function createOrFindConversation(userAId: string, userBId: string) {
  // Normalize order to ensure consistent unique constraint
  const [participantAId, participantBId] = [userAId, userBId].sort();

  const existingConversation = await prisma.conversation.findUnique({
    where: {
      participantAId_participantBId: {
        participantAId,
        participantBId
      }
    }
  });

  if (existingConversation) {
    return existingConversation;
  }

  return await prisma.conversation.create({
    data: {
      participantAId,
      participantBId
    }
  });
}