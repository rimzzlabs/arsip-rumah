'use client'

import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { updateAccountAction } from '../actions'
import type { UpdateAccountSchema } from '../schema'
import { updateAccountSchema } from '../schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

type AccountInfoUpdateFormProps = { userId: string; name: string; email: string }

export function AccountInfoUpdateForm(props: AccountInfoUpdateFormProps) {
  let session = useSession()
  let action = useAction(updateAccountAction)
  let form = useForm<UpdateAccountSchema>({
    defaultValues: { userId: props.userId, name: props.name, email: props.email },
    resolver: zodResolver(updateAccountSchema),
  })

  let { name, email } = useWatch({ control: form.control })

  let valuesAreSame = name === props.name && email === props.email

  let onSubmit = form.handleSubmit(async (values) => {
    toast.loading('Memproses, harap tunggu')
    const res = await action.executeAsync(values)
    toast.dismiss()

    if (res?.serverError || !res?.data) return toast.error('Terjadi kesalahan pada server')
    if (res?.bindArgsValidationErrors || res?.validationErrors) {
      return toast.error('Data tidak valid')
    }

    const [error] = res.data
    if (error) {
      if (error === 'Email sudah terdaftar') form.setError('email', { message: error })
      return toast.error(error)
    }

    await session.update({ email: values.email, name: values.name })
    toast.success('Berhasil memperbarui data')
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-4 px-4 pb-4'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama lengkap</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder='rimzzlabs arsip rumah'
                  />
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
                <FormLabel>Alamat surel</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder='rimzzlabs@arsiprumah.com'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DrawerFooter>
          <Button type='submit' disabled={form.formState.isSubmitting || valuesAreSame}>
            Kirim
          </Button>

          <DrawerClose asChild>
            <Button variant='outline' type='button' disabled={form.formState.isSubmitting}>
              Batal
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  )
}
