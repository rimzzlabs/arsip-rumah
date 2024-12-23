import { auth } from '@/modules/auth'
import { getBills } from '@/modules/bill/query'

import { BillList, BillFormCreateButton } from './components'

import { Fragment } from 'react'

export const metadata = {
  title: 'Daftar tagihan saya',
}

export default async function BillsPage() {
  let session = await auth()
  if (!session?.user) return null

  let bills = await getBills(session.user.id)

  return (
    <Fragment>
      <header className='flex items-center justify-between py-4'>
        <h1 className='text-2xl font-bold'>Daftar Tagihan</h1>

        <BillFormCreateButton />
      </header>

      <BillList bills={bills} />
    </Fragment>
  )
}
