'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputPassword } from '@/components/ui/input'

import { signInAction } from '../actions'
import type { SignInSchema } from '../schema'
import { signInSchema } from '../schema'
import { AuthSubmitButton } from './AuthSubmitButton'
import { AuthTitle } from './AuthTitle'
import { AuthWrapper } from './AuthWrapper'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function AuthSignInForm() {
  let session = useSession()
  let router = useRouter()
  let action = useAction(signInAction)
  let searchParams = useSearchParams()
  let [isTransitioning, startTransition] = useTransition()

  let form = useForm<SignInSchema>({
    defaultValues: { email: searchParams.get('email') ?? '', password: '' },
    resolver: zodResolver(signInSchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading('Memproses, harap tunggu')

    const res = await action.executeAsync(values)
    toast.dismiss()

    if (res?.bindArgsValidationErrors || res?.validationErrors) {
      return toast.error('Data tidak valid')
    }
    if (res?.serverError || res?.data === 'Terjadi kesalahan pada server') {
      return toast.error('Terjadi kesalahan pada server')
    }

    if (res?.data === 'Kredensial tidak sah') return toast.error(res.data)

    toast.success('Berhasil masuk')
    await session.update()

    startTransition(() => {
      router.push('/account')
    })
  })

  return (
    <AuthWrapper>
      <AuthTitle>Masuk Ke Aplikasi</AuthTitle>

      <Form {...form}>
        <form onSubmit={onSubmit} className='grid gap-5'>
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Surel</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    {...field}
                    placeholder='rimzzlabs@arsiprumah.com'
                    disabled={form.formState.isSubmitting || isTransitioning}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata Sandi</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    placeholder='Kata sandi anda'
                    disabled={form.formState.isSubmitting || isTransitioning}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AuthSubmitButton disabled={form.formState.isSubmitting || isTransitioning}>
            Masuk
          </AuthSubmitButton>
        </form>
      </Form>
    </AuthWrapper>
  )
}
