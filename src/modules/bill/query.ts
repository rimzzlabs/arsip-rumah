import { logError } from '@/lib/logger'

import { DB } from '../database'
import { decrypt, deriveKeyFromPassword } from '../encryptor'
import { getUserById } from '../user/query'

import { A, D, pipe } from '@mobily/ts-belt'

export type Bill = { id: string; billType: string; billNumber: string; billName: string }
export type GetBills = Array<[string, Array<Bill>]>

export async function getBills(userId: string): Promise<GetBills> {
  const [error, user] = await getUserById(userId)
  if (error) return []

  try {
    let bills = await DB.query.BILL_SCHEMA.findMany({ where: (b, { eq }) => eq(b.userId, userId) })

    let hashTables = pipe(
      bills,
      A.map((bill) => {
        let key = pipe(user.salt, deriveKeyFromPassword(user.password))
        let billNumber = pipe(
          key,
          decrypt(bill.billNumber, bill.billNumberIv, bill.billNumberAuthTag),
        )
        let billName = pipe(key, decrypt(bill.billName, bill.billNameIv, bill.billNameAuthTag))

        return pipe(bill, D.selectKeys(['id', 'billType']), D.merge({ billNumber, billName }))
      }),
      A.reduce(new Map<string, Array<Bill>>(), (hash, bill) => {
        let sameTypeBill = hash.get(bill.billType)

        if (sameTypeBill) {
          hash.set(bill.billType, sameTypeBill.concat([bill]))
          return hash
        }
        hash.set(bill.billType, [bill])
        return hash
      }),
    )

    return Array.from(hashTables.entries())
  } catch (error) {
    pipe('getBills L:34', logError(error))
    return []
  }
}
