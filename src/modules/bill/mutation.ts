import type { CreateBillSchema, DeleteBillSchema, UpdateBillSchema } from '@/app/bills/schema'
import { logError } from '@/lib/logger'

import { DB } from '../database'
import { BILL_SCHEMA } from '../database/schema'
import { encrypt } from '../encryptor'
import { getUserKey } from './utils'

import { pipe } from '@mobily/ts-belt'
import { and, eq } from 'drizzle-orm'

export async function createBill(payload: CreateBillSchema) {
  let getKey = getUserKey(payload.password)

  const [error, key] = await getKey(payload.userId)
  if (!key) return [error, null]

  let billName = pipe(key, encrypt(payload.billName))
  let billNumber = pipe(key, encrypt(payload.billNumber))

  try {
    await DB.insert(BILL_SCHEMA).values({
      billName: billName.encrypted,
      billNameIv: billName.iv,
      billNameAuthTag: billName.authTag,
      billNumber: billNumber.encrypted,
      billNumberIv: billNumber.iv,
      billNumberAuthTag: billNumber.authTag,
      userId: payload.userId,
      billType: payload.billType,
    })

    return [null, 'success'] as const
  } catch (error) {
    pipe('createBill L:35', logError(error))

    return ['server error', null] as const
  }
}

export async function deleteBill(payload: DeleteBillSchema) {
  try {
    await DB.delete(BILL_SCHEMA).where(
      and(eq(BILL_SCHEMA.userId, payload.userId), eq(BILL_SCHEMA.id, payload.billId)),
    )

    return [null, 'success'] as const
  } catch (error) {
    pipe('deleteBill L:49', logError(error))

    return ['server error', null] as const
  }
}

export async function updateBill(payload: UpdateBillSchema) {
  let getKey = getUserKey(payload.password)

  const [error, key] = await getKey(payload.userId)
  if (!key) return [error, null]

  let billName = pipe(key, encrypt(payload.billName))
  let billNumber = pipe(key, encrypt(payload.billNumber))

  try {
    await DB.update(BILL_SCHEMA)
      .set({
        billName: billName.encrypted,
        billNameIv: billName.iv,
        billNameAuthTag: billName.authTag,
        billNumber: billNumber.encrypted,
        billNumberIv: billNumber.iv,
        billNumberAuthTag: billNumber.authTag,
        billType: payload.billType,
      })
      .where(and(eq(BILL_SCHEMA.userId, payload.userId), eq(BILL_SCHEMA.id, payload.billId)))

    return [null, 'success'] as const
  } catch (error) {
    pipe('deleteBill L:75', logError(error))

    return ['server error', null] as const
  }
}
