import { WritableAtom, atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export function atomWithToggle(initialValue?: boolean): WritableAtom<boolean, [boolean?], void> {
  let anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
    let update = nextValue ?? !get(anAtom)
    set(anAtom, update)
  })

  return anAtom as WritableAtom<boolean, [boolean?], void>
}

export function atomWithToggleAndStorage(
  key: string,
  initialValue?: boolean,
  storage?: any,
): WritableAtom<boolean, [boolean?], void> {
  let anAtom = atomWithStorage(key, initialValue, storage)
  let derivedAtom = atom(
    (get) => get(anAtom),
    (get, set, nextValue?: boolean) => {
      let update = nextValue ?? !get(anAtom)
      void set(anAtom, update)
    },
  )

  return derivedAtom as WritableAtom<boolean, [boolean?], void>
}
