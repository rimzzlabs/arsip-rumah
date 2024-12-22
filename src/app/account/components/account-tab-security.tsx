import { TabsContent } from '@/components/ui/tabs'

import { AccountPasswordForm } from './account-password-form'

export function AccountTabSecurity() {
  return (
    <TabsContent value='security' className='pt-4'>
      <h1 className='px-3 pb-4 text-xl font-bold'>Keamanan dan Kata Sandi</h1>

      <AccountPasswordForm />
    </TabsContent>
  )
}
