import { logError } from '@/lib/logger'

import { DB } from '../database'

import { pipe } from '@mobily/ts-belt'

export async function getUserByEmail(email: string) {
  if (!email) return ['user not found', null] as const

  try {
    let user = await DB.query.USER_SCHEMA.findFirst({
      where: (u, { eq }) => {
        return eq(u.email, email)
      },
    })

    if (!user) return ['user not found', null] as const

    return [null, user] as const
  } catch (error) {
    pipe('getUserByEmail L:19', logError(error))

    return ['server error', null] as const
  }
}

export async function getUserById(id: string) {
  if (!id) return ['user not found', null] as const

  try {
    let user = await DB.query.USER_SCHEMA.findFirst({
      where: (u, { eq }) => {
        return eq(u.id, id)
      },
    })

    if (!user) return ['user not found', null] as const

    return [null, user] as const
  } catch (error) {
    pipe('getUserById L:37', logError(error))

    return ['server error', null] as const
  }
}
