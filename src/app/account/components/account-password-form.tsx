'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { InputPassword } from '@/components/ui/input'

import { useForm } from 'react-hook-form'

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
}

export function AccountPasswordForm() {
  let form = useForm({ defaultValues })

  return (
    <Form {...form}>
      <form className='grid gap-3'>
        <FormField
          name='currentPassword'
          control={form.control}
          render={({ field }) => (
            <FormItem className='px-3'>
              <FormLabel>Kata sandi saat ini</FormLabel>
              <FormControl>
                <InputPassword {...field} placeholder='Password anda saat ini' />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name='newPassword'
          control={form.control}
          render={({ field }) => (
            <FormItem className='px-3'>
              <FormLabel>Kata sandi baru</FormLabel>
              <FormControl>
                <InputPassword {...field} placeholder='6-32 karakter' />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='newPasswordConfirmation'
          render={({ field }) => (
            <FormItem className='px-3'>
              <FormLabel>Kata sandi saat ini</FormLabel>
              <FormControl>
                <InputPassword {...field} placeholder='6-32 karakter' />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex flex-col px-3'>
          <Button size='lg'>Kirim</Button>
        </div>
      </form>
    </Form>
  )
}
