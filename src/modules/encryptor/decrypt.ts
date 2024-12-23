import { pipe, S } from '@mobily/ts-belt'
import crypto from 'crypto'

export function decrypt(data: string, iv: string, authTag: string) {
  return (key: Buffer) => {
    let decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'))
    decipher.setAuthTag(Buffer.from(authTag, 'hex'))

    let decryptedUtf8 = decipher.update(data, 'hex', 'utf8')
    let decryptedFinal = decipher.final('utf8')

    return pipe(decryptedUtf8, S.concat(decryptedFinal))
  }
}
