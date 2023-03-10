import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../../atoms'
import { api } from '../../../lib/axios'

interface Props {
  date: Date
  onCompletedChange: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string
    title: string
    created_at: string
  }>
  completedHabits: string[]
}

export const HabitList = ({ date, onCompletedChange }: Props) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()
  const [currentUser] = useRecoilState(currentUserState)

  useEffect(() => {
    api
      .get('/habit/day', {
        params: {
          date: date.toISOString(),
          userId: currentUser.id,
        },
      })
      .then((res) => {
        setHabitsInfo(res.data)
      })
  }, [])

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habit/${habitId}/toggle?user_id=${currentUser.id}`)
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      )
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    })

    onCompletedChange(completedHabits.length)
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  return (
    <div className={style.wrapper}>
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          className={style.checkboxContainer}
        >
          <div className={style.checkbox}>
            <Checkbox.Indicator>
              <Check size={20} color="white" weight="bold" />
            </Checkbox.Indicator>
          </div>
          <span className={style.spanTitle}>{habit.title}</span>
        </Checkbox.Root>
      ))}
    </div>
  )
}

const style = {
  wrapper: `mt-6 flex flex-col gap-3`,
  checkboxContainer: `flex items-center gap-x-3 group outline-none disabled:cursor-not-allowed`,
  checkbox: `w-8 h-8 rounded-lg transition-all duration-200 focus:outline-none group-focus:ring-violet-500 group-focus:ring-4 group-focus:ring-offset-2 group-focus:ring-offset-background flex items-center justify-center overflow-hidden bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500`,
  spanTitle: `font-semibold max-w-[200px] text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400`,
}
