import { Button } from '@/components/ui/button'
import { For } from '@/components/ui/for'

import { ReceiptTextIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

const PRIVATE_NAVBAR = [
  { label: 'Profil', url: '/account', icon: UserIcon },
  { label: 'Tagihan', url: '/bills', icon: ReceiptTextIcon },
]

export function PrivateNavbar() {
  return (
    <nav className='grid px-2 py-6'>
      <For
        each={PRIVATE_NAVBAR}
        render={({ label, url, icon: Icon }) => (
          <Button size='lg' variant='ghost' className='justify-normal px-4' asChild>
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
