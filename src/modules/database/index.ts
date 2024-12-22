import { env } from '@/modules/env/server'

import * as schema from './schema'

import { drizzle } from 'drizzle-orm/libsql'

export const DB = drizzle({
  schema,
  connection: { url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN },
})
