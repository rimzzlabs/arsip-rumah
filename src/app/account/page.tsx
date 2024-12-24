import { Tabs } from '@/components/ui/tabs'

import { auth } from '@/modules/auth'
import { getBillsCount } from '@/modules/bill/query'

import { AccountTabInfo, AccountTabsList, AccountTabSecurity, ACcountTabOther } from './components'

export default async function AccountPage() {
  let session = await auth()

  if (!session) return null

  let billsCount = await getBillsCount(session.user.id)

  return (
    <Tabs defaultValue='profile' className='pt-6'>
      <AccountTabsList />

      <AccountTabInfo billsCount={billsCount.count} />
      <AccountTabSecurity />
      <ACcountTabOther />
    </Tabs>
  )
}
