import { cn } from '@/lib/utils'

import { Button } from './button'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid='true']:border-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const InputPassword = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<'input'>, 'type'>
>(({ className, ...props }, ref) => {
  let [type, setType] = React.useState<'password' | 'text'>('password')

  let togglePassword = () => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  return (
    <div className='relative'>
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid='true']:border-destructive",
          className,
          'pr-10',
        )}
        ref={ref}
        {...props}
      />

      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={togglePassword}
        className='absolute right-1 top-1 h-8 w-8 border-none'
      >
        {type === 'text' && <EyeIcon size='0.875rem' />}
        {type === 'password' && <EyeOffIcon size='0.875rem' />}
        <span className='sr-only'>Toggle password</span>
      </Button>
    </div>
  )
})
InputPassword.displayName = 'InputPassword'

export { InputPassword }

export { Input }
