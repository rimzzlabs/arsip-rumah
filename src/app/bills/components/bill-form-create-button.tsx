'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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

import { createBillAction } from '../actions'
import { drawerCreateBillAtom, dialogCreateBillAtom } from '../state'
import { BillFormCreate } from './bill-form-create'

import { B, pipe } from '@mobily/ts-belt'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { Fragment } from 'react'

export function BillFormCreateButton() {
  let action = useAction(createBillAction)
  let session = useSession({ required: true })
  let [isDrawerOpen, toggleDrawer] = useAtom(drawerCreateBillAtom)
  let [isDialogOpen, toggleDialog] = useAtom(dialogCreateBillAtom)

  let preventClose = (e: Event) => {
    let shouldPreventClose = pipe(
      action.isExecuting,
      B.or(action.isPending),
      B.or(action.isTransitioning),
    )

    if (shouldPreventClose) e.preventDefault()
  }

  if (session.status !== 'authenticated') {
    return (
      <Button disabled variant='outline'>
        Buat tagihan
      </Button>
    )
  }

  return (
    <Fragment>
      <AlertDialog open={isDialogOpen} onOpenChange={toggleDialog}>
        <AlertDialogTrigger asChild>
          <Button variant='outline' className='max-md:hidden'>
            Buat tagihan
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className='px-6'>
          <AlertDialogHeader className='px-0'>
            <AlertDialogTitle>Buat daftar tagihan</AlertDialogTitle>
            <AlertDialogDescription>
              Anda bisa membuat daftar tagihan baru disini
            </AlertDialogDescription>
          </AlertDialogHeader>
          <BillFormCreate userId={session.data.user.id} />
        </AlertDialogContent>
      </AlertDialog>

      <Drawer open={isDrawerOpen} onOpenChange={toggleDrawer} repositionInputs={false}>
        <DrawerTrigger asChild>
          <Button variant='outline' className='md:hidden'>
            Buat tagihan
          </Button>
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
    </Fragment>
  )
}
