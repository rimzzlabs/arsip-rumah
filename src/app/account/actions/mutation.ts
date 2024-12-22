'use server'

import { signOut } from '@/modules/auth'
import { updateUser } from '@/modules/user/mutation'

import { updateAccountSchema } from '../schema'

import { createSafeActionClient } from 'next-safe-action'

export const signOutAction = createSafeActionClient().action(
  async () => await signOut({ redirect: true, redirectTo: '/auth/signin' }),
)

export const updateAccountAction = createSafeActionClient()
  .schema(updateAccountSchema)
  .action(async (args) => {
    const [error, userId] = await updateUser(args.parsedInput)
    if (error === 'server error') throw new Error('Terjadi kesalahan pada server')
    if (error === 'email already registered') {
      return ['Email sudah terdaftar', null] as const
    }

    return [null, userId] as const
  })
