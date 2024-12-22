import { GlobalHeader } from '@/components/header'

import { SessionProvider } from 'next-auth/react'

export default function Home() {
  return (
    <SessionProvider>
      <GlobalHeader />
      <section className='grid min-h-screen place-items-center'>
        <header>
          <h1 className='text-balance text-center text-4xl font-bold max-lg:text-center xl:text-6xl'>
            Simpan Data Arsip Rumah Anda <span className='text-emerald-500'>Secara Aman</span>{' '}
            Dengan <span className='font-extrabold text-blue-600'>Arsip Rumah</span>
          </h1>
        </header>
      </section>
    </SessionProvider>
  )
}
