import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import GtmLoader from '@/app/(consent)/GtmLoader'
import AuthProvider from '@/components/AuthProvider'
import ScrollTexture from '@/components/ScrollTexture'
import GoldenEdgeLines from '@/components/GoldenEdgeLines'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: "Lil Movements", template: "%s · Lil Movements" },
  description: "Movement-first wellness. Classes, routines and guidance by Lil Movements.",
  icons: { icon: "/favicon.ico" }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-neutral-900 antialiased`}>
        <AuthProvider>
          <ScrollTexture />
          <GoldenEdgeLines />
          <GtmLoader />
          {children}
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  )
}