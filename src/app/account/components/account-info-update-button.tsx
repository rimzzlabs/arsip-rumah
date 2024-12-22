'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { AccountInfoUpdateForm } from './account-info-update-form'

import { useSession } from 'next-auth/react'

export function AccountInfoUpdateButton() {
  let session = useSession({ required: true })

  if (session.status !== 'authenticated') {
    return (
      <Button size='lg' disabled>
        Perbarui
      </Button>
    )
  }

  let user = session.data.user

  return (
    <div className='flex flex-col px-3'>
      <Drawer>
        <DrawerTrigger asChild>
          <Button size='lg'>Perbarui</Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Perbarui Akun</DrawerTitle>
            <DrawerDescription>Kamu bisa memperbarui akunmu disini</DrawerDescription>
          </DrawerHeader>

          <AccountInfoUpdateForm userId={user.id} name={user.name} email={user.email} />
        </DrawerContent>
      </Drawer>
    </div>
  )
}
