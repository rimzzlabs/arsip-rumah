'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { signOutAction } from '../actions'

import { useMediaQuery } from '@uidotdev/usehooks'
import { LogOutIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'

export function AccountLogoutButton() {
  let action = useAction(signOutAction)
  let isDesktop = useMediaQuery('only screen and (min-width: 1024px)')

  let isPending = action.isPending || action.isExecuting || action.isTransitioning

  let onClickSignOut = () => action.execute()

  if (isDesktop) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isPending} variant='destructive'>
            Keluar
            <LogOutIcon size='1em' />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin akhiri sesi?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah anda yakin ingin mengakhiri sesi? anda perlu memasukan kredensial anda lagi
              jika ingin masuk ke aplikasi.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={onClickSignOut} variant='destructive'>
                Akhiri sesi
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button disabled={isPending} variant='destructive'>
          Keluar
          <LogOutIcon size='1em' />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Yakin akhiri sesi?</DrawerTitle>
          <DrawerDescription>
            Apakah anda yakin ingin mengakhiri sesi? anda perlu memasukan kredensial anda lagi jika
            ingin masuk ke aplikasi.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Batal</Button>
          </DrawerClose>

          <Button onClick={onClickSignOut} variant='destructive'>
            Akhiri sesi
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
