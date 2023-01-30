import * as Dialog from '@radix-ui/react-dialog'
import { NewHabitModal } from './NewHabitModal'

interface Props {
  children: React.ReactNode
}

export const TriggerForm = ({ children }: Props) => {
  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <NewHabitModal />
      </Dialog.Portal>
    </Dialog.Root>
  )
}
