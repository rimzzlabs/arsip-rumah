import { Loader2Icon } from 'lucide-react'

export default function BillsPageLoading() {
  return (
    <section className='mx-auto grid min-h-screen place-items-center py-10 max-md:w-11/12'>
      <div className='flex flex-col items-center justify-center gap-2 text-balance text-center'>
        <Loader2Icon size='1.25rem' className='animate-spin' />
        <span className='text-sm font-medium'>
          Men- <em>decrypt</em> daftar tagihan, memproses daftar tagihan
        </span>
      </div>
    </section>
  )
}
