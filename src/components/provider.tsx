import { Toaster } from './ui/sonner'

import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'

export function Provider(props: PropsWithChildren) {
  return (
    <JotaiProvider>
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
    </JotaiProvider>
  )
}
