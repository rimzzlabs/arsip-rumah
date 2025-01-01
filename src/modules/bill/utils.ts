import { comparePassword } from '../auth/lib'
import { deriveKeyFromPassword } from '../encryptor'
import { getUserById } from '../user/query'

import { pipe } from '@mobily/ts-belt'

export function getUserKey(password: string) {
  let checkPassword = comparePassword(password)

  return async (userId: string) => {
    let [error, user] = await getUserById(userId)
    if (error || !user) return [error, null] as const

    let isValidPassword = await checkPassword(user.password)
    if (!isValidPassword) return ['invalid password', null] as const

    let key = pipe(user.salt, deriveKeyFromPassword(user.password))

    return [null, key] as const
  }
}
