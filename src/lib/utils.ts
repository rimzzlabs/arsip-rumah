import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(timeInMs: number) {
  return new Promise((res) => setTimeout(() => res(true), timeInMs))
}

export function sleepWithMinMax(maxMs: number) {
  return (minMs: number) => sleep(random(minMs, maxMs))
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function numericOnChange(onChange: (...args: Array<any>) => void) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isNumericRegex = /^[0-9]*$/.test(value)
    if (!isNumericRegex) return
    onChange(event)
  }
}
