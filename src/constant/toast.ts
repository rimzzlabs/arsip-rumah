import { toast } from 'sonner'

export const getActionToast = (getToastId: () => string | number) => ({
  action: { label: 'Mengerti', onClick: () => toast.dismiss(getToastId()) },
})
