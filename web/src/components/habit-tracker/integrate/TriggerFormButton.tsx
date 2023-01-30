import * as Dialog from '@radix-ui/react-dialog'
import { Plus } from 'phosphor-react'

interface Props {}

export const TriggerFormButton = (props: Props) => {
  return (
    <Dialog.Trigger
      type="button"
      className={style.wrapper}
    >
      <Plus size={20} weight="bold" color="white" />
      Novo hábito
    </Dialog.Trigger>
  )
}

const style = {
  wrapper: `box-border gap-x-2 relative z-30 inline-flex items-center justify-center w-[220px] px-8 py-3 overflow-hidden font-bold text-white transition-all focus:ring-indigo-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background bg-indigo-600 rounded-md cursor-pointer group hover:brightness-125 hover:border-background hover:ring-indigo-500 ease focus:outline-none`,
}
