import { Button } from '@/components/ui/button'
import { For } from '@/components/ui/for'

import type { Bill } from '@/modules/bill/query'

import { DashboardRecentBillsItem } from './dashboard-recent-bills-item'

import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

type DashboardRecentBillsProps = { bills: Array<Bill> }

export function DashboardRecentBills(props: DashboardRecentBillsProps) {
  return (
    <section>
      <h2 className='pb-4 text-xl font-semibold'>Daftar tagihan yang baru saja dibuat</h2>

      <div className='space-y-2 pb-4'>
        <For
          each={props.bills}
          render={(args) => <DashboardRecentBillsItem key={args.id} {...args} />}
        />
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
