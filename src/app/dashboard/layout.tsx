import { PrivateWrapper } from '@/components/header'

import { auth } from '@/modules/auth'

import type { PropsWithChildren } from 'react'

export default async function LayoutDashboardPage(props: PropsWithChildren) {
  let session = await auth()

  return <PrivateWrapper session={session}>{props.children}</PrivateWrapper>
}
