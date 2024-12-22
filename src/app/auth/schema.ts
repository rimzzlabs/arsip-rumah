import { ZOD_DICT } from '@/constant/dict'

import { z } from 'zod'

export type SignInSchema = z.infer<typeof signInSchema>
export const signInSchema = z.object({
  email: z.string().min(1, ZOD_DICT.REQUIRED).email(ZOD_DICT.INVALID_EMAIL),
  password: z.string().min(1, ZOD_DICT.REQUIRED),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
export const signUpSchema = z.object({
  name: z.string().min(1, ZOD_DICT.REQUIRED),
  email: z.string().min(1, ZOD_DICT.REQUIRED).email(ZOD_DICT.INVALID_EMAIL),
  password: z
    .string()
    .min(1, ZOD_DICT.REQUIRED)
    .min(6, ZOD_DICT.PASSWORD_MIN_MAX)
    .max(32, ZOD_DICT.PASSWORD_MIN_MAX)
    .regex(/[A-Z]/, ZOD_DICT.PASSWORD_CASE)
    .regex(/[a-z]/, ZOD_DICT.PASSWORD_CASE)
    .regex(/[0-9]/, ZOD_DICT.PASSWORD_NUMBER)
    .regex(/[!@#$%^&*(),.?":{}|<>]/, ZOD_DICT.PASSWORD_SYMBOL),
})
