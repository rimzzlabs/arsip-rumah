import { Provider } from '@/components/provider'

import './globals.css'

import { Inter } from 'next/font/google'
import type { PropsWithChildren } from 'react'

const interFont = Inter({
  preload: true,
  display: 'swap',
  variable: '--font-inter',
  weight: 'variable',
  subsets: ['latin-ext'],
})

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html suppressHydrationWarning lang='id'>
      <body className={interFont.variable}>
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
