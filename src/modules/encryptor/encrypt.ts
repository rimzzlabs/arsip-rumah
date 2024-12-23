import { pipe, S } from '@mobily/ts-belt'
import crypto from 'crypto'

export function encrypt(data: string) {
  let iv = crypto.randomBytes(16)

  return (key: Buffer) => {
    let cipher = crypto.createCipheriv('aes-256-gcm', key, iv)

    let encryptedUtf8 = cipher.update(data, 'utf8', 'hex')
    let encryptedFinalHex = cipher.final('hex')
    let encrypted = pipe(encryptedUtf8, S.concat(encryptedFinalHex))

    let authTag = cipher.getAuthTag()

    return { iv: iv.toString('hex'), authTag: authTag.toString('hex'), encrypted }
  }
}
