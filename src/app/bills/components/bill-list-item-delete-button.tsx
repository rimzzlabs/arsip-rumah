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

import { deleteBillAction } from '../actions'
import type { DeleteBillSchema } from '../schema'

import { B, pipe } from '@mobily/ts-belt'
import { TrashIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

export function BillListItemDeleteButton(props: DeleteBillSchema) {
  let action = useAction(deleteBillAction)

  let isPending = pipe(action.isExecuting, B.or(action.isPending), B.or(action.isTransitioning))

  let onClickDelete = (payload: DeleteBillSchema) => async () => {
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
        <Button disabled={isPending} variant='destructive' className='h-8 px-2' size='sm'>
          <TrashIcon size='1rem' />
          <span className='sr-only'>Hapus daftar tagihan ini</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Peringatan penghapusan</DrawerTitle>
          <DrawerDescription>
            Apakah anda yakin ingin menghapus daftar tagihan ini?
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Batalkan</Button>
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
