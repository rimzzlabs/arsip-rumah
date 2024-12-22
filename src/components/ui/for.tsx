import type { JSX } from 'react'
import { Children } from 'react'

type IterableChildren<T> = Array<T> | Readonly<Array<T>>

type ForProps<T> = {
  each: IterableChildren<T>
  render: (item: T) => JSX.Element
}
export function For<T>(props: ForProps<T>) {
  let array = props.each.map(props.render)

  return Children.toArray(array)
}
