import { Button } from '@/components/ui/button'

import { PrivateSheet } from './private-sheet'

import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

export function PrivateHeader() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b bg-background'>
      <div className='mx-auto flex h-16 w-11/12 max-w-4xl items-center justify-between'>
        <nav className='inline-flex items-center gap-x-2'>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/dashboard' title='Dashboard'>
              <HomeIcon />
              <span className='sr-only'>Dashboard</span>
            </Link>
          </Button>
        </nav>

        <PrivateSheet />
      </div>
    </header>
  )
}
