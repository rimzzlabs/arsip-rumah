import type { PropsWithChildren } from 'react'

export function AuthTitle(props: PropsWithChildren) {
  return <h1 className='text-balance pb-8 text-center text-3xl font-bold'>{props.children}</h1>
}
