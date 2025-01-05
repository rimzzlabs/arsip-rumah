'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'
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
import { useState } from 'react'

export function AccountInfoUpdateButton() {
  let session = useSession({ required: true })
  let [overlayOpen, setOverlayOpen] = useState({ dialog: false, drawer: false })

  if (session.status !== 'authenticated') {
    return (
      <Button size='lg' disabled>
        Perbarui
      </Button>
    )
  }

  let user = session.data.user
  let onClose = () => setOverlayOpen({ dialog: false, drawer: false })
  let toggleOverlayContent = (key: keyof typeof overlayOpen) => {
    return (open: boolean) => setOverlayOpen((prev) => ({ ...prev, [key]: open }))
  }

  return (
    <div className='flex flex-col px-3'>
      <AlertDialog open={overlayOpen.dialog} onOpenChange={toggleOverlayContent('dialog')}>
        <AlertDialogTrigger asChild>
          <Button className='max-md:hidden' size='lg'>
            Perbarui
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Perbarui Akun</AlertDialogTitle>
            <AlertDialogDescription>Kamu bisa memperbarui akunmu disini</AlertDialogDescription>
          </AlertDialogHeader>

          <AccountInfoUpdateForm
            onClose={onClose}
            userId={user.id}
            name={user.name}
            email={user.email}
          />
        </AlertDialogContent>
      </AlertDialog>

      <Drawer
        repositionInputs={false}
        open={overlayOpen.drawer}
        onOpenChange={toggleOverlayContent('drawer')}
      >
        <DrawerTrigger asChild>
          <Button className='md:hidden' size='lg'>
            Perbarui
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Perbarui Akun</DrawerTitle>
            <DrawerDescription>Kamu bisa memperbarui akunmu disini</DrawerDescription>
          </DrawerHeader>

          <AccountInfoUpdateForm
            onClose={onClose}
            userId={user.id}
            name={user.name}
            email={user.email}
          />
        </DrawerContent>
      </Drawer>
    </div>
  )
}
