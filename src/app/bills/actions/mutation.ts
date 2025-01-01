'use server'

import { createBill, deleteBill, updateBill } from '@/modules/bill/mutation'

import { createBillSchema, deleteBillSchema, updateBillSchema } from '../schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'

export const createBillAction = createSafeActionClient()
  .schema(createBillSchema)
  .action(async (args) => {
    let payload = args.parsedInput
    const [error, res] = await createBill(payload)

    if (error) {
      if (error === 'invalid password') return ['Kata sandi tidak valid', null] as const

      return ['Terjadi kesalahan pada server', null] as const
    }

    revalidatePath('/bills')
    return [null, res] as const
  })

export const deleteBillAction = createSafeActionClient()
  .schema(deleteBillSchema)
  .action(async (args) => {
    let payload = args.parsedInput

    const [error] = await deleteBill(payload)
    if (error) return ['Terjadi kesalahan pada server', null] as const

    revalidatePath('/bills')
    return [null, payload] as const
  })

export const updateBillAction = createSafeActionClient()
  .schema(updateBillSchema)
  .action(async (args) => {
    let payload = args.parsedInput

    const [error] = await updateBill(payload)

    if (error) {
      if (error === 'invalid password') return ['Kata sandi tidak valid', null] as const

      return ['Terjadi kesalahan pada server', null] as const
    }

    revalidatePath('/bills')

    return [null, payload.billId]
  })
