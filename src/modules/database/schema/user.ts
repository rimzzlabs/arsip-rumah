import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const USER_SCHEMA = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  emailVerified: integer('email_verified', { mode: 'timestamp_ms' }),
  image: text('image'),
})
