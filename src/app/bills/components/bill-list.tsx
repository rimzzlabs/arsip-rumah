import { For } from '@/components/ui/for'

import { DICT_BILL_TYPES } from '@/constant/bill-type'
import type { GetBills } from '@/modules/bill/query'

import { BillListItem } from './bill-list-item'
import { BillListPlaceholder } from './bill-list-placeholder'

export function BillList(props: { bills: GetBills }) {
  if (!props?.bills || props?.bills?.length === 0) return <BillListPlaceholder />

  return (
    <section className='grid gap-x-2.5 gap-y-4 py-4 lg:grid-cols-2'>
      <For
        each={props.bills}
        render={([billType, bills]) => (
          <div key={billType}>
            <h2 className='mb-3 text-xl font-semibold'>
              {DICT_BILL_TYPES[billType].emoji} {DICT_BILL_TYPES[billType].label}
            </h2>

            <div className='space-y-2'>
              <For each={bills} render={(args) => <BillListItem key={args.id} {...args} />} />
            </div>
          </div>
        )}
      />
    </section>
  )
}
