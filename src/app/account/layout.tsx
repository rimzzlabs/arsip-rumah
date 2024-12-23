import { PrivateWrapper } from '@/components/header'

import { auth } from '@/modules/auth'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Akun saya',
}

export default async function LayoutAccountPage(props: React.PropsWithChildren) {
  let session = await auth()

  return <PrivateWrapper session={session}>{props.children}</PrivateWrapper>
}
