import { For } from '@/components/ui/for'

import { cn } from '@/lib/utils'

import { PrivateNavbarItem } from './private-navbar-item'

import { ReceiptTextIcon, UserIcon } from 'lucide-react'
import { match } from 'ts-pattern'

const PRIVATE_NAVBAR = [
  { label: 'Akun Saya', url: '/account', icon: UserIcon },
  { label: 'Tagihan', url: '/bills', icon: ReceiptTextIcon },
]

type PrivateNavbarProps = { renderAsButton?: boolean }

export function PrivateNavbar(props: PrivateNavbarProps) {
  let navbarItems = match(props.renderAsButton)
    .with(true, () => [PRIVATE_NAVBAR[1], PRIVATE_NAVBAR[0]])
    .otherwise(() => PRIVATE_NAVBAR)

  return (
    <nav
      className={cn(
        props.renderAsButton ? 'inline-flex items-center gap-x-2 max-md:hidden' : 'grid px-2 py-6',
      )}
    >
      <For
        each={navbarItems}
        render={(args) => (
          <PrivateNavbarItem {...args} key={args.url} renderAsButton={props.renderAsButton} />
        )}
      />
    </nav>
  )
}
