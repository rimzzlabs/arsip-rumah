import { D, pipe } from '@mobily/ts-belt'

export const BILL_TYPES = [
  { label: 'Air PDAM', emoji: '🚰', value: 'water' },
  { label: 'Listrik', emoji: '⚡️', value: 'electricity' },
  { label: 'Kendaraan', emoji: '🛻', value: 'vehicle' },
  { label: 'Pinjaman Tunai', emoji: '💰', value: 'loan' },
  { label: 'Rumah dan Properti', emoji: '🏡', value: 'property' },
  { label: 'Internet dan TV Kabel', emoji: '💻', value: 'internet' },
] as const

let pairs = BILL_TYPES.map((bill) => [bill.value, bill] as const)
export const DICT_BILL_TYPES = pipe(pairs, D.fromPairs)
