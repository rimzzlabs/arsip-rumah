'use client'

import { Button } from '@/components/ui/button'
import { DrawerFooter } from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputPassword } from '@/components/ui/input'

import { getActionToast } from '@/constant/toast'
import { numericOnChange } from '@/lib/utils'

import { createBillAction } from '../actions'
import type { CreateBillSchema } from '../schema'
import { createBillSchema } from '../schema'
import { dialogCreateBillAtom, drawerCreateBillAtom } from '../state'
import { BillFormCreateListType } from './bill-form-create-list-type'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type CreateBillFormProps = {
  userId: string
}

export function BillFormCreate(props: CreateBillFormProps) {
  let action = useAction(createBillAction)
  let closeDrawer = useSetAtom(drawerCreateBillAtom)
  let closeDialog = useSetAtom(dialogCreateBillAtom)
  let form = useForm<CreateBillSchema>({
    defaultValues: {
      userId: props.userId,
      billName: '',
      billNumber: '',
      password: '',
      billType: '',
    },
    resolver: zodResolver(createBillSchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    toast.dismiss()
    toast.loading('Memproses, harap tunggu')
    let res = await action.executeAsync(values)
    toast.dismiss()

    if (res?.serverError) return toast.error('Terjadi kesalahan pada server')
    if (res?.bindArgsValidationErrors || res?.validationErrors) {
      return toast.error('Data tidak valid')
    }

    const [error] = res?.data || [null, null]
    if (error) {
      if (error === 'Kata sandi tidak valid') {
        form.setError('password', { message: error })
      }
      return toast.error(error)
    }

    form.reset()
    closeDialog(false)
    closeDrawer(false)
    let toastId = toast.success(
      'Berhasil menyimpan informasi tagihan',
      getActionToast(() => toastId),
    )
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='grid gap-4'>
        <BillFormCreateListType />

        <FormField
          name='billName'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Tagihan</FormLabel>
              <FormControl>
                <Input placeholder='Nama tagihan' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='billNumber'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Tagihan</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  inputMode='numeric'
                  placeholder='123456789'
                  onChange={numericOnChange(field.onChange)}
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
                <InputPassword placeholder='Masukkan kata sandi anda' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DrawerFooter className='px-0 md:grid md:grid-cols-2 md:gap-2'>
          <Button
            size='lg'
            type='button'
            variant='secondary'
            className='max-md:hidden'
            onClick={() => closeDialog()}
          >
            Batalkan
          </Button>

          <Button
            size='lg'
            type='submit'
            className='max-md:w-full'
            disabled={form.formState.isSubmitting}
          >
            Buat tagihan
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  )
}
