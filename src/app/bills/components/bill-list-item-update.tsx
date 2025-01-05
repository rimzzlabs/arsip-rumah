import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { preventDefault } from '@/lib/utils'

import type { UpdateBillSchema } from '../schema'
import { BillListItemUpdateForm } from './bill-list-item-update-form'

import { PenBoxIcon } from 'lucide-react'
import { Fragment } from 'react'

type BillListItemUpdateProps = { onClose: () => void } & Pick<
  UpdateBillSchema,
  'billId' | 'billName' | 'billNumber' | 'billType' | 'userId'
>

export function BillListItemUpdate(props: BillListItemUpdateProps) {
  return (
    <Fragment>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <DropdownMenuItem onSelect={preventDefault} className='text-sm'>
            <PenBoxIcon size='0.875rem' />
            Perbarui
          </DropdownMenuItem>
        </AlertDialogTrigger>

        <AlertDialogContent className='px-6'>
          <AlertDialogHeader className='px-0'>
            <AlertDialogTitle>Perbarui Data Tagihan</AlertDialogTitle>

            <AlertDialogDescription>
              Anda bisa menggunakan fitur ini untuk mengubah data, misal: jika anda melakukan
              kesalahan seperti salah nomor tagihan
            </AlertDialogDescription>
          </AlertDialogHeader>

          <BillListItemUpdateForm {...props} />
        </AlertDialogContent>
      </AlertDialog>

      <Drawer repositionInputs={false}>
        <DrawerTrigger asChild>
          <DropdownMenuItem onSelect={preventDefault} className='text-sm md:hidden'>
            <PenBoxIcon size='0.875rem' />
            Perbarui
          </DropdownMenuItem>
        </DrawerTrigger>

        <DrawerContent className='px-6'>
          <DrawerHeader className='px-0'>
            <DrawerTitle>Perbarui Data Tagihan</DrawerTitle>

            <DrawerDescription>
              Anda bisa menggunakan fitur ini untuk mengubah data, misal: jika anda melakukan
              kesalahan seperti salah nomor tagihan
            </DrawerDescription>
          </DrawerHeader>

          <BillListItemUpdateForm {...props} />
        </DrawerContent>
      </Drawer>
    </Fragment>
  )
}
