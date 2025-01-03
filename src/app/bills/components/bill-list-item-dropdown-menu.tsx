import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { deleteBillAction, updateBillAction } from '../actions'
import type { DeleteBillSchema, UpdateBillSchema } from '../schema'
import { BillListItemDelete } from './bill-list-item-delete'
import { BillListItemUpdate } from './bill-list-item-update'

import { B, pipe } from '@mobily/ts-belt'
import { MoreVerticalIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

type BillListItemDropdownMenuProps = DeleteBillSchema &
  Pick<UpdateBillSchema, 'billName' | 'billNumber' | 'billType'>

export function BillListItemDropdownMenu(props: BillListItemDropdownMenuProps) {
  let deleteAction = useAction(deleteBillAction)
  let updateAction = useAction(updateBillAction)
  let [open, setOpen] = useState(false)

  let isPending = pipe(
    deleteAction.isExecuting,
    B.or(deleteAction.isPending),
    B.or(deleteAction.isTransitioning),
    B.or(updateAction.isExecuting),
    B.or(updateAction.isPending),
    B.or(updateAction.isTransitioning),
  )

  let onClose = () => setOpen(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size='sm' className='px-2' variant='ghost' disabled={isPending}>
          <MoreVerticalIcon size='1rem' />
          <span className='sr-only'>Menu lainnya</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Menu lainnya</DropdownMenuLabel>
        <DropdownMenuGroup>
          <BillListItemUpdate
            billId={props.billId}
            userId={props.userId}
            billName={props.billName}
            billNumber={props.billNumber}
            billType={props.billType}
            onClose={onClose}
          />

          <BillListItemDelete onClose={onClose} billId={props.billId} userId={props.userId} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
