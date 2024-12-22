'use client'

import { For } from '@/components/ui/for'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { useTheme } from 'next-themes'
import { useId } from 'react'

const THEMES = [
  { label: 'Sistem', value: 'system' },
  { label: 'Gelap', value: 'dark' },
  { label: 'Terang', value: 'light' },
]

export function AccountThemePreference() {
  const { theme, setTheme } = useTheme()

  return (
    <RadioGroup defaultValue={theme ?? 'system'} onValueChange={setTheme}>
      <For
        each={THEMES}
        render={(args) => <UserThemePreferenceRadio {...args} key={args.value} />}
      />
    </RadioGroup>
  )
}

function UserThemePreferenceRadio(props: (typeof THEMES)[0]) {
  const id = useId()

  return (
    <div className='flex items-center space-x-2'>
      <RadioGroupItem value={props.value} id={id} />
      <Label htmlFor={id}>{props.label}</Label>
    </div>
  )
}
