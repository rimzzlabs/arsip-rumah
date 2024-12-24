import { auth } from '@/modules/auth'
import { getRecentBills } from '@/modules/bill/query'

import { DashboardRecentBills } from './components'

import { Fragment } from 'react'

export const metadata = {
  title: 'Dasbor Arsip Rumah',
}

export default async function DashboardPage() {
  let session = await auth()

  if (!session) return null

  let bills = await getRecentBills(session.user.id)

  return (
    <Fragment>
      <header className='py-4'>
        <h1 className='text-2xl font-bold'>Halo {session.user.name}</h1>
        <p>Sudah siap membayar tagihanmu?</p>
      </header>

      <DashboardRecentBills bills={bills} />

      <div className='mx-auto w-3/4 pt-24'>
        <p className='text-center text-muted-foreground'>👀</p>
        <p className='text-balance text-center text-sm font-medium text-muted-foreground/80'>
          Probably nothing, probably something is coming.
        </p>
      </div>
    </Fragment>
  )
}
