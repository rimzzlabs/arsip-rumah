import { Toaster } from './ui/sonner'

import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'

export function Provider(props: PropsWithChildren) {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      storageKey='preferences.theme'
      defaultTheme='system'
      disableTransitionOnChange
    >
      {props.children}

      <Toaster />
    </ThemeProvider>
  )
}
