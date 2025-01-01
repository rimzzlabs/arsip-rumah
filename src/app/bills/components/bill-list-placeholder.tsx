import { cn } from '@/lib/utils'

import { F } from '@mobily/ts-belt'
import { match, P } from 'ts-pattern'

type BillListPlaceholderProps = {
  className?: string
  label?: string
  emoji?: string
}

const DEFAULT_EMOJI = '🏂'
const DEFAULT_LABEL = 'Belum ada daftar tagihan, nih.'

export function BillListPlaceholder(props: BillListPlaceholderProps) {
  let emoji = match(props.emoji)
    .with(P.nullish, () => DEFAULT_EMOJI)
    .otherwise(F.identity)
  let label = match(props.label)
    .with(P.nullish, () => DEFAULT_LABEL)
    .otherwise(F.identity)

  return (
    <div className={cn('flex h-96 flex-col items-center justify-center', props.className)}>
      <div className='mb-4 text-3xl'>{emoji}</div>
      <p className='text-center text-sm font-medium'>{label}</p>
    </div>
  )
}
