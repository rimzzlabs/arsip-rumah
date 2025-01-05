'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { PrivateNavbar } from './private-navbar'

import { AlignJustifyIcon } from 'lucide-react'
import { Fragment } from 'react'

export function PrivateSheet() {
  return (
    <Fragment>
      <PrivateNavbar renderAsButton />

      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' className='md:hidden'>
            <AlignJustifyIcon size='1rem' />
            <span className='sr-only'>Menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side='right' className='px-0'>
          <SheetHeader className='px-4'>
            <SheetTitle>Menu Aplikasi</SheetTitle>
            <SheetDescription className='sr-only'>Akses halaman menu</SheetDescription>
          </SheetHeader>

          <PrivateNavbar />
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}
