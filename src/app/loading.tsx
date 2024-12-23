import { Loader2Icon } from 'lucide-react'

export default function GlobalLoading() {
  return (
    <section className='grid min-h-screen place-items-center py-10'>
      <div className='flex flex-col items-center justify-center gap-2 text-center'>
        <Loader2Icon size='1.25rem' className='animate-spin' />
        <span className='text-sm font-medium'>Memproses permintaan</span>
      </div>
    </section>
  )
}
