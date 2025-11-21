import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    createdAt?: Date | string
    membershipPlan?: string | null
  }

  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}

// Google Tag Manager types
declare global {
  interface Window {
    dataLayer: any[];
  }
}