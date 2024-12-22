import { GlobalHeader } from '@/components/header'

import { auth } from '@/modules/auth'

import { SessionProvider } from 'next-auth/react'
import type { PropsWithChildren } from 'react'

export default async function LayoutAuthPage(props: PropsWithChildren) {
  let session = await auth()

  return (
    <SessionProvider session={session}>
      <GlobalHeader />
      <main className='mx-auto grid min-h-screen w-11/12 max-w-4xl place-items-center py-10'>
        {props.children}
      </main>
    </SessionProvider>
  )
}
