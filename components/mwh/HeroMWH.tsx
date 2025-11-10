'use client'

import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../assets/Lil Movements (LOGO).png'

export default function HeroMWH() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-10 bg-gradient-to-b from-white to-neutral-100 text-center">
      <Image
        src={Logo}
        alt="Lil Movements logo"
        width={480}
        height={480}
        className="w-full max-w-[480px] h-auto animate-fade-in"
        priority
      />

      <Link
        href="/join"
        className="px-8 py-3 bg-black text-white rounded-xl text-base font-semibold hover:scale-105 hover:opacity-90 transition-all duration-300"
      >
        Become a Member
      </Link>
    </section>
  )
}