import type { PropsWithChildren } from 'react'

export function AuthWrapper(props: PropsWithChildren) {
  return <section className='w-full'>{props.children}</section>
}
