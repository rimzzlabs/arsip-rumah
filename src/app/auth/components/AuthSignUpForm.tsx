'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputPassword } from '@/components/ui/input'

import { signUpAction } from '../actions'
import type { SignUpSchema } from '../schema'
import { signUpSchema } from '../schema'
import { AuthSubmitButton } from './AuthSubmitButton'
import { AuthTitle } from './AuthTitle'
import { AuthWrapper } from './AuthWrapper'

import { zodResolver } from '@hookform/resolvers/zod'
import { BookTypeIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function AuthSignUpForm() {
  let action = useAction(signUpAction)
  let router = useRouter()
  let [isTransitioning, startTransition] = useTransition()

  let form = useForm<SignUpSchema>({
    defaultValues: { email: '', password: '', name: '' },
    resolver: zodResolver(signUpSchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading('Memproses, harap tunggu')

    let res = await action.executeAsync(values)
    toast.dismiss()

    if (res?.serverError || !res?.data) return toast.error('Terjadi kesalahan pada server')
    if (res?.validationErrors) return toast.error('Data tidak valid')

    const [error] = res.data
    if (error) {
      if (error === 'Alamat surel sudah terdaftar') {
        form.setError('email', { message: error })
      }
      return toast.error(error)
    }

    toast.success('Berhasil mendaftar', { description: 'Silakan masuk untuk melanjutkan' })
    startTransition(() => {
      router.push(`/auth/signin?email=${values.email}`)
    })
  })

  return (
    <AuthWrapper>
      <AuthTitle>
        <BookTypeIcon size='1em' className='mx-auto' />
        Daftar Ke Aplikasi
      </AuthTitle>

      <Form {...form}>
        <form onSubmit={onSubmit} className='grid gap-5'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap Anda</FormLabel>
                <FormControl>
                  <Input placeholder='rimzzlabs arsip rumah' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Surel</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='rimzzlabs@arsiprumah.com'
                    disabled={isTransitioning || form.formState.isSubmitting}
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
                    disabled={isTransitioning || form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Kata sandi harus 6 - 32 karakter. Harus mengandung setidaknya karakter angka,
                  karakter simbol, huruf besar, dan huruf kecil.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <AuthSubmitButton disabled={form.formState.isSubmitting || isTransitioning}>
            Daftar
          </AuthSubmitButton>
        </form>
      </Form>
    </AuthWrapper>
  )
}
