import * as Popover from '@radix-ui/react-popover'
import { ProgressBar } from './ProgressBar'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { HabitList } from './HabitList'
import { useState } from 'react'

interface Props {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export const HabitDay = ({ defaultCompleted = 0, amount = 0, date }: Props) => {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  function handleCompletedChange(completed: number) {
    setCompleted(completed)
  }

  const clsxStyles = {
    'bg-zinc-900 border-zinc-800': completedPercentage === 0,
    'bg-violet-900 border-violet-500':
      completedPercentage > 0 && completedPercentage < 20,
    'bg-violet-800 border-violet-500':
      completedPercentage >= 20 && completedPercentage < 40,
    'bg-violet-700 border-violet-500':
      completedPercentage >= 40 && completedPercentage < 60,
    'bg-violet-600 border-violet-500':
      completedPercentage >= 60 && completedPercentage < 80,
    'bg-violet-500 border-violet-400': completedPercentage >= 80,
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 cursor-pointer  border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-violet-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background',
          clsxStyles
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col transition-all duration-200 focus:outline-none focus:ring-violet-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitList date={date} onCompletedChange={handleCompletedChange} />

          <Popover.Arrow width={16} height={8} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
