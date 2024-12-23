import { signInSchema } from '@/app/auth/schema'
import { logError } from '@/lib/logger'

import { getUserById } from '../user/query'
import { verifyCredentials } from './lib'

import { D, pipe } from '@mobily/ts-belt'
import { CredentialsSignin, type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const AUTH_CONFIG = {
  providers: [
    Credentials({
      credentials: {
        email: { type: 'email', placeholder: 'Alamat surel anda' },
        password: { type: 'password', placeholder: 'Kata sandi Anda' },
      },
      authorize: async (credentials) => {
        let parsedCredentials = signInSchema.safeParse(credentials)
        if (parsedCredentials.error) throw new CredentialsSignin('Kredensial tidak valid')

        let payload = parsedCredentials.data
        let [error, res] = await pipe(payload.password, verifyCredentials(payload.email))

        if (error) {
          if (error === 'server error') throw new Error('Kesalahan pada server, harap coba lagi')
          throw new CredentialsSignin('Kredensial tidak valid')
        }

        if (!res) return null

        return pipe(res, D.selectKeys(['id', 'email', 'name', 'image']))
      },
    }),
  ],
  callbacks: {
    session: async (args) => {
      if (!args.token.sub) throw new Error('unauthorized')

      const [error, res] = await getUserById(args.token.sub)
      if (error) {
        pipe('auth.session callback L:39', logError(error))

        if (error === 'user not found') {
          throw new Error('unauthorized')
        }

        return args.session
      }

      args.session.user.id = res.id
      args.session.user.image = res.image
      args.session.user.name = res.name
      args.session.user.email = res.email
      args.session.user.salt = res.salt
      return args.session
    },
  },
} satisfies NextAuthConfig
