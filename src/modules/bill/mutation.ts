import type { CreateBillSchema, DeleteBillSchema } from '@/app/bills/schema'
import { logError } from '@/lib/logger'

import { comparePassword } from '../auth/lib'
import { DB } from '../database'
import { BILL_SCHEMA } from '../database/schema'
import { deriveKeyFromPassword, encrypt } from '../encryptor'
import { getUserById } from '../user/query'

import { pipe } from '@mobily/ts-belt'
import { and, eq } from 'drizzle-orm'

export async function createBill(payload: CreateBillSchema) {
  let checkPassword = comparePassword(payload.password)

  let [error, user] = await getUserById(payload.userId)
  if (error || !user) return [error, null] as const

  let isValidPassword = await checkPassword(user.password)
  if (!isValidPassword) return ['invalid password', null] as const

  let key = pipe(user.salt, deriveKeyFromPassword(user.password))
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
    pipe('createBill L:40', logError(error))

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
    pipe('deleteBill L:54', logError(error))
    return ['server error', null] as const
  }
}
