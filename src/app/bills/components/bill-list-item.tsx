'use client'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import type { Bill } from '@/modules/bill/query'

import { BillListItemDropdownMenu } from './bill-list-item-dropdown-menu'

import { useCopyToClipboard } from '@uidotdev/usehooks'
import { ClipboardIcon, MoreVerticalIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { match } from 'ts-pattern'

export function BillListItem(props: Bill) {
  let session = useSession({ required: true })
  let [, copyToClipboard] = useCopyToClipboard()
  let [clipboardStatus, setClipboardStatus] = useState<'idle' | 'pending'>('idle')

  let onClickCopy = (value: string) => async () => {
    setClipboardStatus('pending')
    await copyToClipboard(value)
    setClipboardStatus('idle')
    toast.success('Nomor tagihan berhasil disalin')
  }

  return (
    <Card className='flex items-center justify-between'>
      <CardHeader className='p-4'>
        <CardTitle>{props.billNumber}</CardTitle>
        <CardDescription>{props.billName}</CardDescription>
      </CardHeader>

      <CardFooter className='gap-2 p-4'>
        <Button
          size='sm'
          className='px-2'
          variant='outline'
          disabled={clipboardStatus === 'pending'}
          onClick={onClickCopy(props.billNumber)}
        >
          <ClipboardIcon size='1rem' />
          <span className='sr-only'>Salin nomor tagihan</span>
        </Button>

        {match(session)
          .with({ status: 'loading' }, () => (
            <Button disabled size='sm' className='px-2' variant='ghost'>
              <MoreVerticalIcon size='1rem' />
              <span className='sr-only'>Menu lainnya</span>
            </Button>
          ))
          .otherwise((session) => (
            <BillListItemDropdownMenu
              billId={props.id}
              billName={props.billName}
              billType={props.billType}
              billNumber={props.billNumber}
              userId={session.data.user.id}
            />
          ))}
      </CardFooter>
    </Card>
  )
}
