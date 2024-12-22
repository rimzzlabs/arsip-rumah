'use server'

import { signIn } from '@/modules/auth'
import { createUser } from '@/modules/user/mutation'

import { signInSchema, signUpSchema } from '../schema'

import { AuthError } from 'next-auth'
import { createSafeActionClient } from 'next-safe-action'

export const signInAction = createSafeActionClient()
  .schema(signInSchema)
  .action(async (args) => {
    try {
      await signIn('credentials', {
        email: args.parsedInput.email,
        password: args.parsedInput.password,
      })

      return 'Sukses' as const
    } catch (error) {
      if (error instanceof AuthError) {
        if (error.type === 'CredentialsSignin') return 'Kredensial tidak sah' as const
      }

      if (String(error).includes('NEXT_REDIRECT')) return 'Sukses' as const

      return 'Terjadi kesalahan pada server' as const
    }
  })

export const signUpAction = createSafeActionClient()
  .schema(signUpSchema)
  .action(async (args) => {
    const [error, res] = await createUser(args.parsedInput)
    if (error) {
      if (error === 'email already registered') {
        return ['Alamat surel sudah terdaftar', null] as const
      }

      return ['terjadi kesalahan pada server harap coba lagi', null] as const
    }

    return [null, res] as const
  })
