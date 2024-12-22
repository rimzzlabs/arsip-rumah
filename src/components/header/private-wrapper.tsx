import { cn } from '@/lib/utils'

import { PrivateHeader } from './private-header'

import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type PropsWithChildren } from 'react'

type PrivateWrapperProps = PropsWithChildren & { className?: string; session?: Session | null }

export function PrivateWrapper(props: PrivateWrapperProps) {
  return (
    <SessionProvider session={props.session}>
      <PrivateHeader />
      <main className={cn('mx-auto max-w-4xl pt-16 max-lg:w-11/12', props.className)}>
        {props.children}
      </main>
    </SessionProvider>
  )
}
