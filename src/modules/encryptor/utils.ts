import crypto from 'crypto'

export function deriveKeyFromPassword(password: string) {
  return (salt: string) => crypto.pbkdf2Sync(password, salt, 100_000, 32, 'sha256')
}
