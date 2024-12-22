import { AuthSignInForm } from '../components'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Masuk ke arsip rumah',
}

export default function SignInPage() {
  return <AuthSignInForm />
}
