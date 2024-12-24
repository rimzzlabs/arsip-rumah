'use client'

import { For } from '@/components/ui/for'
import { TabsContent } from '@/components/ui/tabs'

import { generateAvatar } from '@/lib/avatar'

import { AccountInfoUpdateButton } from './account-info-update-button'

import { F, O, pipe } from '@mobily/ts-belt'
import { Loader2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

type AccountTabInfoProps = { billsCount: number }

export function AccountTabInfo(props: AccountTabInfoProps) {
  let session = useSession({ required: true })

  if (session.status !== 'authenticated') {
    return (
      <TabsContent value='profile' className='grid h-96 place-items-center'>
        <Loader2Icon size='1rem' className='animate-spin' />
      </TabsContent>
    )
  }

  let name = pipe(session.data.user?.name, O.fromNullable, O.mapWithDefault('', F.identity))
  let email = pipe(session.data.user?.email, O.fromNullable, O.mapWithDefault('', F.identity))

  const USER_MAP = [
    { key: 'name', label: 'Nama Lengkap', value: name },
    { key: 'email', label: 'Alamat surel', value: email },
    { key: 'billsCount', label: 'Jumlah Daftar Tagihan', value: props.billsCount },
  ]

  let avatar = generateAvatar(email).toDataUri()

  return (
    <TabsContent value='profile' className='pt-4'>
      <div className='px-3'>
        <h1 className='pb-4 text-xl font-bold'>Profil</h1>
        <div className='size-24 overflow-hidden rounded-xl bg-muted'>
          <Image width={96} height={96} src={avatar} alt='profile' className='object-cover' />
        </div>
      </div>

      <ul className='py-4'>
        <For
          each={USER_MAP}
          render={({ label, value, key }) => (
            <li className='px-3 pb-3 last-of-type:pb-0' key={key}>
              <span className='text-sm text-muted-foreground'>{label}</span>
              <div className='rounded bg-muted px-3 py-2'>{value}</div>
            </li>
          )}
        />
      </ul>

      <AccountInfoUpdateButton />
    </TabsContent>
  )
}
