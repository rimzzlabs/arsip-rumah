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

import { updateBillAction } from '../actions'
import type { UpdateBillSchema } from '../schema'
import { updateBillSchema } from '../schema'
import { BillFormCreateListType } from './bill-form-create-list-type'

import { zodResolver } from '@hookform/resolvers/zod'
import { B, pipe } from '@mobily/ts-belt'
import { useAction } from 'next-safe-action/hooks'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

type BillListItemUpdateForm = { onClose: () => void } & Pick<
  UpdateBillSchema,
  'billId' | 'billName' | 'billNumber' | 'billType' | 'userId'
>

export function BillListItemUpdateForm(props: BillListItemUpdateForm) {
  let action = useAction(updateBillAction)
  let form = useForm<UpdateBillSchema>({
    defaultValues: { ...props, password: '' },
    resolver: zodResolver(updateBillSchema),
  })
  let values = useWatch({ control: form.control })

  let isSameBillName = props.billName === values.billName
  let isSameBillType = props.billType === values.billType
  let isSameBillNumber = props.billNumber === values.billNumber

  let dataIsSame = pipe(isSameBillName, B.and(isSameBillType), B.and(isSameBillNumber))

  let disableSubmitButton = pipe(
    dataIsSame,
    B.or(action.isPending),
    B.or(action.isExecuting),
    B.or(form.formState.isSubmitting),
  )

  let onSubmit = form.handleSubmit(async (values) => {
    toast.dismiss()
    props.onClose()
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
            onClick={props.onClose}
          >
            Batalkan
          </Button>

          <Button disabled={disableSubmitButton} type='submit' size='lg' className='w-full'>
            Perbarui tagihan
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  )
}
