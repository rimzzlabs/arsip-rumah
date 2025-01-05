import { Loader2Icon } from 'lucide-react'
import type { PropsWithChildren } from 'react'

export function LoadingPage(props: PropsWithChildren) {
  return (
    <section className='grid h-[calc(100svh-4rem)] place-items-center max-lg:mx-auto max-lg:w-11/12'>
      <div className='flex flex-col items-center justify-center gap-2 text-balance text-center'>
        <Loader2Icon size='1.25rem' className='animate-spin' />
        {props.children}
      </div>
    </section>
  )
}
