import { thumbs } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'

export function generateAvatar(seed: string) {
  return createAvatar(thumbs, { seed, size: 48 })
}
