import { AuthSignUpForm } from '../components'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daftar ke arsip rumah',
}

export default function SignInPage() {
  return <AuthSignUpForm />
}
