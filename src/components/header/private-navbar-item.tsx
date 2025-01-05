'use client'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type PrivateNavbarProps = {
  label: string
  url: string
  icon: LucideIcon
  renderAsButton?: boolean
}

export function PrivateNavbarItem({
  url,
  label,
  icon: Icon,
  renderAsButton = false,
}: PrivateNavbarProps) {
  let pathname = usePathname()

  const BUTTON_SIZE = renderAsButton ? 'sm' : 'lg'

  return (
    <Button
      asChild
      key={url}
      variant='ghost'
      size={BUTTON_SIZE}
      className={cn(
        !renderAsButton && 'justify-normal px-4',
        renderAsButton && pathname === url && 'bg-muted',
      )}
    >
      <Link href={url}>
        <Icon size='1em' />
        {label}
      </Link>
    </Button>
  )
}
