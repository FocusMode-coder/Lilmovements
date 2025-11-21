'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlassButton from '@/components/GlassButton';

// Types
interface SuggestedMember {
  id: string;
  name: string | null;
  createdAt: string;
}

interface ContactRequestData {
  id: string;
  fromUser: {
    id: string;
    name: string | null;
  };
  createdAt: string;
}

interface ConversationData {
  id: string;
  otherParticipant: {
    id: string;
    name: string | null;
  };
  lastMessage?: {
    content: string;
    createdAt: string;
    senderId: string;
  };
}

interface MessageData {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    name: string | null;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Social state
  const [suggestedMembers, setSuggestedMembers] = useState<SuggestedMember[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequestData[]>([]);
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Redirect unauthenticated users to join page
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/join');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fffaf6] to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render content if not authenticated (prevents flash)
  if (!session) {
    return null;
  }

  // Fetch social data
  useEffect(() => {
    if (session?.user?.id) {
      fetchSocialData();
    }
  }, [session?.user?.id]);

  const fetchSocialData = async () => {
    try {
      const [membersRes, requestsRes, conversationsRes] = await Promise.all([
        fetch('/api/social/suggested-members'),
        fetch('/api/social/contact-requests'),
        fetch('/api/social/conversations')
      ]);

      if (membersRes.ok) {
        setSuggestedMembers(await membersRes.json());
      }
      if (requestsRes.ok) {
        setContactRequests(await requestsRes.json());
      }
      if (conversationsRes.ok) {
        setConversations(await conversationsRes.json());
      }
    } catch (error) {
      console.error('Failed to fetch social data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactRequest = async (toUserId: string) => {
    try {
      const response = await fetch('/api/contact-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toUserId })
      });

      if (response.ok) {
        // Remove from suggested members
        setSuggestedMembers(prev => prev.filter(member => member.id !== toUserId));
      }
    } catch (error) {
      console.error('Failed to send contact request:', error);
    }
  };

  const handleRequestResolution = async (requestId: string, action: 'accept' | 'reject') => {
    try {
      const response = await fetch('/api/contact-requests/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, action })
      });

      if (response.ok) {
        // Remove from contact requests
        setContactRequests(prev => prev.filter(req => req.id !== requestId));
        // Refresh conversations if accepted
        if (action === 'accept') {
          fetchSocialData();
        }
      }
    } catch (error) {
      console.error('Failed to resolve request:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/messages?conversationId=${conversationId}`);
      if (response.ok) {
        const messagesData = await response.json();
        setMessages(messagesData);
        setActiveConversation(conversationId);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: activeConversation,
          content: newMessage.trim()
        })
      });

      if (response.ok) {
        const message = await response.json();
        setMessages(prev => [...prev, message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-neutral-900">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 w-full h-full object-cover"
      >
        <source src="/assets/lilys-backgroundweb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Soft Overlay */}
      <div className="absolute inset-0 z-10 bg-black/25 backdrop-blur-[2px]"></div>

      {/* Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 py-10 space-y-8">
        
        {/* TOP HERO CARD */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Side - Welcome Text */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-2">
              Welcome back, {session.user?.name || 'Beautiful Soul'}!
            </h1>
            <p className="text-lg text-neutral-600">
              Free Trial • Ready to move with intention today?
            </p>
          </div>
          
          {/* Right Side - Action Buttons */}
          <div className="flex flex-col gap-3 md:min-w-[200px]">
            <GlassButton
              label="Start Today's Practice"
              onClick={() => {}}
              variant="primary"
              className="w-full hover:scale-105 transition-transform duration-200"
            />
            <GlassButton
              label="Explore Classes"
              onClick={() => {}}
              variant="secondary"
              className="w-full hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>

        {/* CLASSES FEED SECTION */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white drop-shadow-lg">
            This Week's Sessions
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Class Card 1 */}
            <div className="rounded-2xl bg-white/65 backdrop-blur-md border border-white/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-neutral-900">Morning Flow</h3>
                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  25 min
                </span>
              </div>
              <p className="text-neutral-600 text-sm mb-4">
                Gentle awakening movements to start your day with intention and energy.
              </p>
              <GlassButton
                label="Play"
                variant="secondary"
                className="w-full text-sm"
              />
            </div>

            <div className="rounded-2xl bg-white/65 backdrop-blur-md border border-white/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-neutral-900">Strength & Flow</h3>
                <span className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                  Dynamic
                </span>
              </div>
              <p className="text-neutral-600 text-sm mb-4">
                Build functional strength while honoring your body's natural wisdom.
              </p>
              <GlassButton
                label="Play"
                variant="secondary"
                className="w-full text-sm"
              />
            </div>

            <div className="rounded-2xl bg-white/65 backdrop-blur-md border border-white/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-neutral-900">Evening Unwind</h3>
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Gentle
                </span>
              </div>
              <p className="text-neutral-600 text-sm mb-4">
                Release the day's tension and prepare your body for restful sleep.
              </p>
              <GlassButton
                label="Play"
                variant="secondary"
                className="w-full text-sm"
              />
            </div>
          </div>
        </div>

        {/* COMMUNITY SECTION */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white drop-shadow-lg">
            Community
          </h2>
          
          {/* Suggested Members */}
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-2">
              {suggestedMembers.map((member) => (
                <div key={member.id} className="flex flex-col items-center gap-2 min-w-[70px]">
                  <button
                    onClick={() => handleContactRequest(member.id)}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-orange-300 flex items-center justify-center text-white font-semibold text-lg shadow-lg hover:scale-110 transition-transform duration-200"
                  >
                    {(member.name?.[0] || 'M').toUpperCase()}
                  </button>
                  <span className="text-white text-sm font-medium drop-shadow">
                    {member.name?.split(' ')[0] || 'Member'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Requests Card */}
            <div className="rounded-2xl bg-white/65 backdrop-blur-md border border-white/50 shadow-md p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Connection Requests ({contactRequests.length})
              </h3>
              {contactRequests.length === 0 ? (
                <p className="text-neutral-600 text-sm">No pending requests</p>
              ) : (
                <div className="space-y-3">
                  {contactRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 rounded-xl bg-white/50">
                      <span className="font-medium text-neutral-900">
                        {request.fromUser.name || 'Member'}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRequestResolution(request.id, 'accept')}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequestResolution(request.id, 'reject')}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Messages Card */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-xl p-4 flex flex-col h-[400px]">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Messages
              </h3>
              <div className="flex gap-4 flex-1 min-h-0">
                {/* Conversations List */}
                <div className="w-1/3 border-r border-white/30 pr-4">
                  <div className="space-y-2 max-h-full overflow-y-auto">
                    {conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => loadMessages(conv.id)}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          activeConversation === conv.id 
                            ? 'bg-white/80' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      >
                        <div className="font-medium text-sm text-neutral-900">
                          {conv.otherParticipant.name || 'Member'}
                        </div>
                        <div className="text-xs text-neutral-600 truncate">
                          {conv.lastMessage?.content || 'Start chatting...'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Chat */}
                <div className="flex-1 flex flex-col min-h-0">
                  {activeConversation ? (
                    <>
                      {/* Messages Area */}
                      <div className="flex-1 overflow-y-auto space-y-2 text-sm mb-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender.id === session?.user?.id ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-[70%] px-3 py-2 rounded-lg ${
                                message.sender.id === session?.user?.id
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/80 text-neutral-900'
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <form onSubmit={sendMessage} className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 px-3 py-2 rounded-lg bg-white/70 border border-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          Send
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-neutral-600 text-sm">
                      Select a conversation to start chatting
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="flex justify-center pt-4">
          <GlassButton
            label="Sign Out"
            onClick={handleSignOut}
            variant="secondary"
            className="opacity-80"
          />
        </div>
      </div>
    </div>
  );
}