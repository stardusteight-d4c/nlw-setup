import React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { ProgressBar } from './ProgressBar'
import clsx from 'clsx'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import dayjs from 'dayjs'

interface Props {
  date: Date
  completed?: number
  amount?: number
}

export const HabitDay = ({ completed = 0, amount = 0, date }: Props) => {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

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
          'w-10 h-10 cursor-pointer  border-2 rounded-lg',
          clsxStyles
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-x-3 group">
              <div className="w-8 h-8 rounded-lg flex items-center overflow-hidden justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} color="white" weight="bold" />
                </Checkbox.Indicator>
              </div>
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2l de água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow width={16} height={8} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
