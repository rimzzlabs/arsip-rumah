'use client'

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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { preventDefault } from '@/lib/utils'

import { deleteBillAction } from '../actions'
import type { DeleteBillSchema } from '../schema'
import { billItemDropdownAtom } from './bill-list-item-dropdown-menu'

import { useSetAtom } from 'jotai'
import { TrashIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

export function BillListItemDelete(props: DeleteBillSchema) {
  let action = useAction(deleteBillAction)
  let closeDropdown = useSetAtom(billItemDropdownAtom)

  let onClickDelete = (payload: DeleteBillSchema) => async () => {
    closeDropdown(false)
    let res = await action.executeAsync(payload)
    if (res?.serverError) toast.error('Terjadi kesalahan pada server')
    if (res?.validationErrors || res?.bindArgsValidationErrors) {
      return toast.error('Data tidak valid')
    }

    let [error] = res?.data || [null]
    if (error) toast.error(error)

    toast.success('Berhasil menghapus daftar transaksi')
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <DropdownMenuItem
          onSelect={preventDefault}
          className='text-red-600 data-[highlighted]:text-red-600'
        >
          <TrashIcon size='1rem' />
          Hapus
        </DropdownMenuItem>
      </DrawerTrigger>

      <DrawerContent onCloseAutoFocus={preventDefault}>
        <DrawerHeader>
          <DrawerTitle>Peringatan penghapusan</DrawerTitle>
          <DrawerDescription>
            Apakah anda yakin ingin menghapus daftar tagihan ini?
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={() => closeDropdown(false)} variant='outline'>
              Batalkan
            </Button>
          </DrawerClose>

          <DrawerClose asChild>
            <Button onClick={onClickDelete(props)} variant='destructive'>
              Ya, Hapus
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
