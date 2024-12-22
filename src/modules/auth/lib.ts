import { getUserByEmail } from '../user/query'

import { hash, compare } from 'bcryptjs'

const SALT = 10
export async function hashPassword(password: string) {
  return await hash(password, SALT)
}

export function comparePassword(input: string) {
  return async (hash: string) => await compare(input, hash)
}

export function verifyCredentials(email: string) {
  return async (password: string) => {
    let checkPassword = comparePassword(password)
    const [error, data] = await getUserByEmail(email)

    if (error) return ['server error', null] as const
    if (!data) return ['user not found', null] as const

    let isMatch = await checkPassword(data.password)
    if (!isMatch) return ['invalid credentials', null] as const

    return [null, data] as const
  }
}
