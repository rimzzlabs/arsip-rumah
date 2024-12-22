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

export function PrivateSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <AlignJustifyIcon />
          <span className='sr-only'>Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side='right' className='px-0'>
        <SheetHeader>
          <SheetTitle>Menu Aplikasi</SheetTitle>
          <SheetDescription className='sr-only'>Akses halaman menu</SheetDescription>
        </SheetHeader>

        <PrivateNavbar />
      </SheetContent>
    </Sheet>
  )
}
