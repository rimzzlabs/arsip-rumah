import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { atomWithToggle } from '@/lib/state'

import { deleteBillAction, updateBillAction } from '../actions'
import type { DeleteBillSchema, UpdateBillSchema } from '../schema'
import { BillListItemDelete } from './bill-list-item-delete'
import { BillListItemUpdate } from './bill-list-item-update'

import { B, pipe } from '@mobily/ts-belt'
import { useAtom } from 'jotai'
import { MoreVerticalIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'

type BillListItemDropdownMenuProps = DeleteBillSchema &
  Pick<UpdateBillSchema, 'billName' | 'billNumber' | 'billType'>

export const billItemDropdownAtom = atomWithToggle(false)

export function BillListItemDropdownMenu(props: BillListItemDropdownMenuProps) {
  let deleteAction = useAction(deleteBillAction)
  let updateAction = useAction(updateBillAction)
  let [open, setOpen] = useAtom(billItemDropdownAtom)

  let isPending = pipe(
    deleteAction.isExecuting,
    B.or(deleteAction.isPending),
    B.or(deleteAction.isTransitioning),
    B.or(updateAction.isExecuting),
    B.or(updateAction.isPending),
    B.or(updateAction.isTransitioning),
  )

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
            key={props.billId}
          />

          <BillListItemDelete billId={props.billId} userId={props.userId} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
