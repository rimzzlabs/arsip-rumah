import { ZOD_DICT } from '@/constant/dict'

import { z } from 'zod'

export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>
export const updateAccountSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(1, ZOD_DICT.REQUIRED),
  email: z.string().min(1, ZOD_DICT.REQUIRED).email(ZOD_DICT.INVALID_EMAIL),
})
