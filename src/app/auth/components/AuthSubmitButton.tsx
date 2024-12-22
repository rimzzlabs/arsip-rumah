import { Button } from '@/components/ui/button'

export function AuthSubmitButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className='flex justify-end'>
      <Button {...props} type='submit' />
    </div>
  )
}
