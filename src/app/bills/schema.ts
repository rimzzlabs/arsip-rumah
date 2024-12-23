import { ZOD_DICT } from '@/constant/dict'

import { z } from 'zod'

export type CreateBillSchema = z.infer<typeof createBillSchema>
export const createBillSchema = z.object({
  userId: z.string().min(1, ZOD_DICT.REQUIRED),
  billName: z.string().min(1, ZOD_DICT.REQUIRED),
  billNumber: z.string().min(1, ZOD_DICT.REQUIRED),
  password: z.string().min(1, ZOD_DICT.REQUIRED),
  billType: z.string().min(1, ZOD_DICT.REQUIRED),
})

export type DeleteBillSchema = z.infer<typeof deleteBillSchema>
export const deleteBillSchema = z.object({
  userId: z.string().min(1, ZOD_DICT.REQUIRED),
  billId: z.string().min(1, ZOD_DICT.REQUIRED),
})
