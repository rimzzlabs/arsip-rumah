import { Button } from '@/components/ui/button'
import { For } from '@/components/ui/for'

import { ArchiveIcon, ReceiptTextIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

const PRIVATE_NAVBAR = [
  { label: 'Profil', url: '/account', icon: UserIcon },
  { label: 'Tagihan', url: '/bills', icon: ReceiptTextIcon },
  { label: 'Arsip', url: '/archive', icon: ArchiveIcon },
]

export function PrivateNavbar() {
  return (
    <nav className='grid px-2'>
      <For
        each={PRIVATE_NAVBAR}
        render={({ label, url, icon: Icon }) => (
          <Button variant='ghost' className='justify-normal' asChild>
            <Link href={url}>
              <Icon size='1em' />
              {label}
            </Link>
          </Button>
        )}
      />
    </nav>
  )
}
