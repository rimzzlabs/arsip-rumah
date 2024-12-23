import { USER_SCHEMA } from './user'

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const BILL_SCHEMA = sqliteTable('bill', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => USER_SCHEMA.id),
  billName: text('bill_name').notNull(),
  billNameIv: text('bill_name_iv').notNull(),
  billNameAuthTag: text('bill_name_auth_tag').notNull(),
  billNumber: text('bill_number').notNull(),
  billNumberIv: text('bill_number_iv').notNull(),
  billNumberAuthTag: text('bill_number_auth_tag').notNull(),

  billType: text('label_type').notNull(),

  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
})
