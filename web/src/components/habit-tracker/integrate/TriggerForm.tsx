import { Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { NewHabitModal } from './NewHabitForm'

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
