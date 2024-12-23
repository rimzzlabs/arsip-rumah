import { For } from '@/components/ui/for'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { BILL_TYPES } from '@/constant/bill-type'

import type { CreateBillSchema } from '../schema'

import { useFormContext } from 'react-hook-form'

export function BillFormCreateListType() {
  let form = useFormContext<CreateBillSchema>()

  return (
    <FormField
      name='billType'
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Jenis tagihan</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger disabled={form.formState.isSubmitting}>
                <SelectValue placeholder='Pilih jenis tagihan' />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                <For
                  each={BILL_TYPES}
                  render={({ label, value, emoji }) => (
                    <SelectItem key={value} value={value}>
                      {emoji} {label}
                    </SelectItem>
                  )}
                />
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
