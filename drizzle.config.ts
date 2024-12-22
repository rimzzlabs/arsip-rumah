import { env } from '@/modules/env/server'

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'turso',
  out: './drizzle',
  schema: './src/modules/database/schema',
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
})
