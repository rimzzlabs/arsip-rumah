export function logError<E>(error: E) {
  return (label: string) => console.log(`(LOG ERROR) - ${label} ->`, error)
}
