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

import { createBillAction } from '../actions'
import { drawerCreateBillAtom } from '../state'
import { BillFormCreate } from './bill-form-create'

import { B, pipe } from '@mobily/ts-belt'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'

export function BillFormCreateButton() {
  let session = useSession({ required: true })
  let [isDrawerOpen, toggleDrawer] = useAtom(drawerCreateBillAtom)
  let action = useAction(createBillAction)

  let preventClose = (e: Event) => {
    let shouldPreventClose = pipe(
      action.isExecuting,
      B.or(action.isPending),
      B.or(action.isTransitioning),
    )

    if (shouldPreventClose) e.preventDefault()
  }

  if (session.status !== 'authenticated') return <Button variant='outline'>Buat tagihan</Button>

  return (
    <Drawer open={isDrawerOpen} onOpenChange={toggleDrawer} repositionInputs={false}>
      <DrawerTrigger asChild>
        <Button variant='outline'>Buat tagihan</Button>
      </DrawerTrigger>

      <DrawerContent
        className='px-6'
        onInteractOutside={preventClose}
        onPointerDownOutside={preventClose}
      >
        <DrawerHeader className='px-0'>
          <DrawerTitle>Buat daftar tagihan</DrawerTitle>
          <DrawerDescription>Anda bisa membuat daftar tagihan baru disini</DrawerDescription>
        </DrawerHeader>
        <BillFormCreate userId={session.data.user.id} />
      </DrawerContent>
    </Drawer>
  )
}
