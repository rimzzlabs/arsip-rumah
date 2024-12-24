'use client'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { DICT_BILL_TYPES } from '@/constant/bill-type'
import type { Bill } from '@/modules/bill/query'

import { F, O, pipe } from '@mobily/ts-belt'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { ClipboardIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function DashboardRecentBillsItem(props: Bill) {
  let [, copyToClipboard] = useCopyToClipboard()
  let [clipboardStatus, setClipboardStatus] = useState<'idle' | 'pending'>('idle')

  let emoji = pipe(
    DICT_BILL_TYPES[props.billType].emoji as string,
    O.fromNullable,
    O.mapWithDefault('', F.identity),
  )

  let onClickCopy = (value: string) => async () => {
    setClipboardStatus('pending')
    await copyToClipboard(value)
    setClipboardStatus('idle')
    toast.success('Nomor tagihan berhasil disalin')
  }

  return (
    <Card className='flex items-center justify-between'>
      <CardHeader className='p-4'>
        <CardTitle>
          {emoji} {props.billNumber}
        </CardTitle>
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
      </CardFooter>
    </Card>
  )
}
