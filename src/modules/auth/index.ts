import { DB } from '@/modules/database'
import { ACCOUNT_SCHEMA, USER_SCHEMA } from '@/modules/database/schema'

import { AUTH_CONFIG } from './config'

import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { N, pipe } from '@mobily/ts-belt'
import NextAuth from 'next-auth'

const MAX_AGE = pipe(7, N.multiply(24), N.multiply(60), N.multiply(60), N.multiply(1000))

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  jwt: { maxAge: MAX_AGE },
  pages: { signIn: '/auth/signin' },
  session: { strategy: 'jwt', maxAge: MAX_AGE },
  adapter: DrizzleAdapter(DB, { usersTable: USER_SCHEMA, accountsTable: ACCOUNT_SCHEMA }),
  ...AUTH_CONFIG,
})
