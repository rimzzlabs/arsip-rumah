import type { UpdateAccountSchema } from '@/app/account/schema'
import type { SignUpSchema } from '@/app/auth/schema'
import { logError } from '@/lib/logger'

import { hashPassword } from '../auth/lib'
import { DB } from '../database'
import { USER_SCHEMA } from '../database/schema'

import { LibsqlError } from '@libsql/client'
import { D, pipe } from '@mobily/ts-belt'
import { eq } from 'drizzle-orm'
import { tryit } from 'radash'

export async function createUser(payload: SignUpSchema) {
  const [error, password] = await tryit(hashPassword)(payload.password)
  if (error) return ['failed to hash password', null] as const

  try {
    await DB.insert(USER_SCHEMA).values({
      email: payload.email,
      name: payload.name,
      password,
    })

    let data = pipe(payload, D.deleteKey('password'))

    return [null, data] as const
  } catch (error) {
    pipe('createUser L:26', logError(error))

    if (error instanceof LibsqlError && error.code === 'SQLITE_CONSTRAINT') {
      return ['email already registered', null] as const
    }

    return ['server error', null] as const
  }
}

export async function updateUser(payload: UpdateAccountSchema) {
  try {
    await DB.update(USER_SCHEMA).set(payload).where(eq(USER_SCHEMA.id, payload.userId))

    return [null, payload.userId] as const
  } catch (error) {
    pipe('updateUser L:48', logError(error))
    if (error instanceof LibsqlError && error.code === 'SQLITE_CONSTRAINT') {
      return ['email already registered', null] as const
    }

    return ['server error', null] as const
  }
}
