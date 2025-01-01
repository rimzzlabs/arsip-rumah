import { Button } from '@/components/ui/button'
import { For } from '@/components/ui/for'

import { BillListPlaceholder } from '@/app/bills/components/bill-list-placeholder'
import type { Bill } from '@/modules/bill/query'

import { DashboardRecentBillsItem } from './dashboard-recent-bills-item'

import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { match } from 'ts-pattern'

type DashboardRecentBillsProps = { bills: Array<Bill> }

export function DashboardRecentBills(props: DashboardRecentBillsProps) {
  let isEmptyBills = props.bills.length === 0

  return (
    <section>
      <h2 className='pb-4 text-xl font-semibold'>Daftar tagihan yang baru saja dibuat</h2>

      <div className='space-y-2 pb-4'>
        {match(isEmptyBills)
          .with(true, () => (
            <BillListPlaceholder
              className='h-72 text-balance'
              label='Waduh, dari Sabang sampai Merauke, kamu nampaknya belum membuat daftar tagihan satupun.'
            />
          ))
          .with(false, () => (
            <For
              each={props.bills}
              render={(args) => <DashboardRecentBillsItem key={args.id} {...args} />}
            />
          ))
          .exhaustive()}
      </div>

      <Button size='lg' className='w-full' asChild>
        <Link href='/bills'>
          Buat daftar tagihan
          <ArrowRightIcon size='1em' />
        </Link>
      </Button>
    </section>
  )
}
