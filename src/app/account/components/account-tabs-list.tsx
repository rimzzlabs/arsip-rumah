import { For } from '@/components/ui/for'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'

import { InfoIcon, UserIcon } from 'lucide-react'

const TAB_LIST = [
  { value: 'profile', label: 'Profil', icon: UserIcon },
  // { value: 'security', label: 'Keamanan', icon: ShieldIcon },
  { value: 'other', label: 'Lainnya', icon: InfoIcon },
]

export function AccountTabsList() {
  return (
    <section className='px-3'>
      <TabsList>
        <For
          each={TAB_LIST}
          render={({ label, value, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className='gap-x-1'>
              <Icon size='1em' />
              {label}
            </TabsTrigger>
          )}
        />
      </TabsList>
    </section>
  )
}
