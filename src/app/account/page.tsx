import { Tabs } from '@/components/ui/tabs'

import { AccountTabInfo, AccountTabsList, AccountTabSecurity, ACcountTabOther } from './components'

export default function AccountPage() {
  return (
    <Tabs defaultValue='profile' className='pt-6'>
      <AccountTabsList />

      <AccountTabInfo />
      <AccountTabSecurity />
      <ACcountTabOther />
    </Tabs>
  )
}
