import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  isServer: true,
  experimental__runtimeEnv: process.env,
  server: { TURSO_DATABASE_URL: z.string().url(), TURSO_AUTH_TOKEN: z.string() },
})
