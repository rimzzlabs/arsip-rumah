'use client'

import { Button } from '@/components/ui/button'
import { For } from '@/components/ui/for'

import { Skeleton } from '../ui/skeleton'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { match } from 'ts-pattern'

export const GLOBAL_NAVBAR_ITEMS = [
  { label: 'Daftar', url: '/auth/signup' },
  { label: 'Masuk', url: '/auth/signin' },
] as const

export function GlobalNavbar() {
  const session = useSession()

  let navbarItems = match(session)
    .with({ status: 'loading' }, () => <Skeleton className='h-9 w-32' />)
    .with({ status: 'authenticated' }, () => (
      <Button asChild>
        <Link href='/dashboard'>Masuk aplikasi</Link>
      </Button>
    ))
    .otherwise(() => (
      <For
        each={GLOBAL_NAVBAR_ITEMS}
        render={({ label, url }) => (
          <Button key={url} variant={label === 'Daftar' ? 'default' : 'ghost'} asChild>
            <Link href={url}>{label}</Link>
          </Button>
        )}
      />
    ))

  return <nav className='inline-flex items-center gap-x-2'>{navbarItems}</nav>
}
