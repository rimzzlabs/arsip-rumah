import { logError } from '@/lib/logger'

import { DB } from '../database'
import { decrypt, deriveKeyFromPassword } from '../encryptor'
import { getUserById } from '../user/query'

import { A, D, F, pipe } from '@mobily/ts-belt'

export type Bill = { id: string; billType: string; billNumber: string; billName: string }
export type GetBills = Array<[string, Array<Bill>]>

export async function getBills(userId: string): Promise<GetBills> {
  const [error, user] = await getUserById(userId)
  if (error) return []

  try {
    let bills = await DB.query.BILL_SCHEMA.findMany({
      where: (b, { eq }) => eq(b.userId, userId),
      orderBy: (b, { desc }) => desc(b.createdAt),
    })

    let hash = new Map<string, Array<Bill>>()

    let hashTables = pipe(
      bills,
      A.map((bill) => {
        let key = pipe(user.salt, deriveKeyFromPassword(user.password))

        let billNumberDecryptor = decrypt(
          bill.billNumber,
          bill.billNumberIv,
          bill.billNumberAuthTag,
        )
        let billNumber = pipe(key, billNumberDecryptor)

        let billNameDecryptor = decrypt(bill.billName, bill.billNameIv, bill.billNameAuthTag)
        let billName = pipe(key, billNameDecryptor)

        return pipe(bill, D.selectKeys(['id', 'billType']), D.merge({ billNumber, billName }))
      }),
      A.reduce(hash, (hash, bill) => {
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

export async function getRecentBills(userId: string): Promise<Array<Bill>> {
  const [error, user] = await getUserById(userId)
  if (error) return []

  try {
    let bills = await DB.query.BILL_SCHEMA.findMany({
      limit: 5,
      where: (b, { eq }) => eq(b.userId, userId),
      orderBy: (b, { desc }) => desc(b.createdAt),
    })

    let decrypted = pipe(
      bills,
      A.map((bill) => {
        let key = pipe(user.salt, deriveKeyFromPassword(user.password))

        let billNumberDecryptor = decrypt(
          bill.billNumber,
          bill.billNumberIv,
          bill.billNumberAuthTag,
        )
        let billNumber = pipe(key, billNumberDecryptor)

        let billNameDecryptor = decrypt(bill.billName, bill.billNameIv, bill.billNameAuthTag)
        let billName = pipe(key, billNameDecryptor)

        return pipe(bill, D.selectKeys(['id', 'billType']), D.merge({ billNumber, billName }))
      }),
      F.toMutable,
    )

    return decrypted
  } catch (error) {
    pipe('getRecentBills L:94', logError(error))
    return []
  }
}

export async function getBillsCount(userId: string) {
  try {
    let bills = await DB.query.BILL_SCHEMA.findMany({ where: (b, { eq }) => eq(b.userId, userId) })

    return { count: bills.length }
  } catch (error) {
    pipe('getRecentBills L:94', logError(error))
    return { count: 0 }
  }
}
