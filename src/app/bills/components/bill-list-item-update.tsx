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
import { BillFormUpdate } from './bill-form-update'

import { PenBoxIcon } from 'lucide-react'

type BillListItemUpdateProps = Pick<
  UpdateBillSchema,
  'billId' | 'billName' | 'billNumber' | 'billType' | 'userId'
>

export function BillListItemUpdate(props: BillListItemUpdateProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <DropdownMenuItem onSelect={preventDefault} className='text-sm'>
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

        <BillFormUpdate {...props} />
      </DrawerContent>
    </Drawer>
  )
}
