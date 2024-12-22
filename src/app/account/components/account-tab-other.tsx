'use client'

import { TabsContent } from '@/components/ui/tabs'

import { AccountThemePreference } from './account-theme-preference'

import dynamic from 'next/dynamic'
import { match, P } from 'ts-pattern'

let AccountLogoutButton = dynamic(
  () => import('./account-logout-button').then((m) => ({ default: m.AccountLogoutButton })),
  {
    ssr: false,
    loading: (props) =>
      match(props.isLoading)
        .with(P.nullish.or(false), () => null)
        .with(true, () => <div className='h-9 w-24 animate-pulse rounded bg-muted' />)
        .exhaustive(),
  },
)

export function ACcountTabOther() {
  return (
    <TabsContent value='other' className='pt-4'>
      <h1 className='px-3 pb-4 text-xl font-bold'>Menu lainnya</h1>

      <div className='px-3 pb-6'>
        <h2 className='pb-3 text-lg font-semibold'>Pengaturan aplikasi</h2>
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>Preferensi tema</p>

          <AccountThemePreference />
        </div>
      </div>

      <div className='px-3'>
        <h2 className='pb-3 text-lg font-semibold'>Lainnya</h2>

        <div className='inline-flex flex-col items-start gap-2'>
          <span className='text-sm text-muted-foreground'>Keluar aplikasi</span>
          <AccountLogoutButton />
        </div>
      </div>
    </TabsContent>
  )
}
