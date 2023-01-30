import logoImage from '../../../assets/logo.svg'
import { Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { NewHabitForm } from './NewHabitForm'
import LogoutButton from '../../LogoutButton'

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({ setLoading }: Props) => {
  return (
    <header className="w-full max-w-3xl mx-auto z-0 flex items-center justify-between">
      <img src={logoImage} alt="Habits" />
      <div className="flex items-center gap-x-5">
        <LogoutButton setLoading={setLoading} />
        <Dialog.Root>
          <Dialog.Trigger
            type="button"
            className="box-border gap-x-2 relative z-30 inline-flex items-center justify-center w-fit px-8 py-3 overflow-hidden font-bold text-white transition-all focus:ring-indigo-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background bg-indigo-600 rounded-md cursor-pointer group hover:brightness-125 hover:border-background hover:ring-indigo-500 ease focus:outline-none"
          >
            <Plus
              size={20}
              weight="bold"
              color="white"
              className="text-indigo-500"
            />
            Novo hábito
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen bg-black/30 fixed inset-0" />
            <Dialog.Content className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-zinc-900 rounded-2xl w-full max-w-md">
              <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-indigo-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-zinc-900">
                <X size={24} aria-label="Fechar" />
              </Dialog.Close>

              <Dialog.Title className="text-3xl leading-tight font-extrabold">
                Criar hábito
              </Dialog.Title>
              <NewHabitForm />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
