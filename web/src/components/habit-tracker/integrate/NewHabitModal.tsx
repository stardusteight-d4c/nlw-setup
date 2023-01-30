import { Check, X } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useState } from 'react'
import { api } from '../../../lib/axios'
import { useRecoilState } from 'recoil'
import * as Dialog from '@radix-ui/react-dialog'
import { currentUserState } from '../../../atoms'

interface Props {}

export const NewHabitModal = (props: Props) => {
  const [title, setTitle] = useState<string>()
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [currentUser] = useRecoilState(currentUserState)

  const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ]

  const textInputProps = {
    type: 'text',
    id: 'title',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setTitle(e.target.value),
    placeholder: 'ex.: Exercícios, dormir bem, etc...',
    autoFocus: true,
    value: title,
    className: style.textInput,
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay)
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      setWeekDays((prevState) => [...prevState, weekDay])
    }
  }

  async function createNewHabit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }

    await api.post('/habit/create', {
      title,
      userId: currentUser.id,
      weekDays,
    })

    setTitle('')
    setWeekDays([])
    alert('Hábito criado com sucesso')
  }

  return (
    <>
      <Dialog.Overlay className={style.overlay} />
      <Dialog.Content className={style.content}>
        <Dialog.Close className={style.close}>
          <X size={24} aria-label="Fechar" />
        </Dialog.Close>
        <Dialog.Title className={style.title}>Criar hábito</Dialog.Title>
        <form onSubmit={(e) => createNewHabit(e)} className={style.form}>
          <label htmlFor="title" className={style.label}>
            Qual seu comprometimento?
          </label>
          <input {...textInputProps} />
          <label className={style.label}>Qual a recorrência?</label>
          <div className={style.checkboxWrapper}>
            {availableWeekDays.map((day, index) => (
              <Checkbox.Root
                checked={weekDays.includes(index)}
                onCheckedChange={() => handleToggleWeekDay(index)}
                className={style.checkboxContainer}
                key={day}
              >
                <div className={style.checkbox}>
                  <Checkbox.Indicator>
                    <Check size={20} color="white" weight="bold" />
                  </Checkbox.Indicator>
                </div>
                <span className={style.checkboxSpan}>{day}</span>
              </Checkbox.Root>
            ))}
          </div>
          <button type="submit" className={style.buttonSubmit}>
            <Check size={20} weight="bold" />
            Confirmar
          </button>
        </form>
      </Dialog.Content>
    </>
  )
}

const style = {
  overlay: `w-screen h-screen bg-black/30 fixed inset-0`,
  content: `absolute z-[50] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 px-4 md:p-8 bg-zinc-900 md:rounded-2xl h-screen w-screen md:w-full md:max-w-md md:max-h-[600px]`,
  close: `absolute right-6 top-[26px] text-zinc-400 hover:text-zinc-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-indigo-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-zinc-900`,
  title: `text-3xl -mt-3 leading-tight font-extrabold`,
  form: `w-full h-full flex flex-col md:mt-4 z-50`,
  label: `font-semibold leading-tight mt-2`,
  textInput: `p-4 rounded-lg mt-2 mb-3 bg-zinc-800 text-white placeholder:text-zinc-400 outline-none transition-all duration-200 focus:outline-none focus:ring-violet-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-zinc-900`,
  checkboxWrapper: `mt-2 flex flex-col gap-2`,
  checkboxContainer: `flex items-center gap-x-3 group focus:outline-none`,
  checkbox: `w-8 h-8 duration-200 focus:outline-none group-focus:ring-violet-500 group-focus:ring-4 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900 rounded-lg flex items-center overflow-hidden justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500`,
  checkboxSpan: `text-white leading-tight`,
  buttonSubmit: `mt-6 transition-all duration-200 focus:outline-none focus:ring-green-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background rounded-lg p-4 flex items-center justify-center gap-x-3 font-semibold bg-green-600 hover:bg-green-500`,
}
