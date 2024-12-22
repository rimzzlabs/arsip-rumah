import { Button } from '@/components/ui/button'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Halaman tidak ditemukan' }

export default function NotFound() {
  return (
    <main className='grid min-h-screen place-items-center'>
      <section className='flex max-w-xl flex-col items-center justify-center text-balance text-center'>
        <h1 className='mb-4 text-3xl font-bold'>404 | Tidak Ditemukan</h1>
        <p className='py-2'>
          Konten yang anda cari mungkin sudah tidak valid dan tidak dapat kami temukan. Jika anda
          percaya ini adalah sebuah masalah, anda bisa{' '}
          <Button variant='link' className='h-auto p-0 text-base underline decoration-dashed'>
            melaporkan hal ini
          </Button>
        </p>
        <Button asChild>
          <Link href='/'>Kembali</Link>
        </Button>
      </section>
    </main>
  )
}
