import { PrivateWrapper } from '@/components/header'

import type { PropsWithChildren } from 'react'

export default function BillsPageLayout(props: PropsWithChildren) {
  return <PrivateWrapper>{props.children}</PrivateWrapper>
}
