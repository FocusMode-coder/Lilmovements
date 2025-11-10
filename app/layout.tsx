import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import GtmLoader from '@/app/(consent)/GtmLoader'

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
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <GtmLoader />
      </body>
    </html>
  )
}