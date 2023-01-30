import * as Popover from '@radix-ui/react-popover'
import { ProgressBar } from './ProgressBar'
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

  return (
    <Popover.Root>
      <Popover.Trigger className={style.handleWrapper(completedPercentage)} />
      <Popover.Portal>
        <Popover.Content className={style.popoverContent}>
          <span className={style.dayOfWeekSpan}>{dayOfWeek}</span>
          <span className={style.dayAndMonthSpan}>{dayAndMonth}</span>
          <ProgressBar progress={completedPercentage} />
          <HabitList date={date} onCompletedChange={handleCompletedChange} />
          <Popover.Arrow width={20} height={14} className={style.arrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

const style = {
  handleWrapper: (percentage: number) => {
    const defaultStyle = `w-10 h-10 cursor-pointer border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-violet-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background`
    if (percentage === 0) {
      return `${defaultStyle} bg-zinc-900 border-zinc-800`
    } else if (percentage > 0 && percentage < 20) {
      return `${defaultStyle} bg-violet-900 border-violet-500`
    } else if (percentage >= 20 && percentage < 40) {
      return `${defaultStyle} bg-violet-800 border-violet-500`
    } else if (percentage >= 40 && percentage < 60) {
      return `${defaultStyle} bg-violet-700 border-violet-500`
    } else if (percentage >= 60 && percentage < 80) {
      return `${defaultStyle} bg-violet-600 border-violet-500`
    } else if (percentage >= 80) {
      return `${defaultStyle} bg-violet-500 border-violet-400`
    }
  },
  popoverContent: `min-w-[320px] z-50 p-6 rounded-2xl bg-zinc-900 flex flex-col transition-all duration-200 focus:outline-none focus:ring-violet-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background`,
  dayOfWeekSpan: `font-semibold text-zinc-400`,
  dayAndMonthSpan: `mt-1 font-extrabold leading-tight text-3xl`,
  arrow: `fill-zinc-900`,
}
