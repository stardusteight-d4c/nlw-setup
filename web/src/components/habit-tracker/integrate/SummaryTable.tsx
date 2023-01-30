import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../../atoms'
import { api } from '../../../lib/axios'
import { generateDatesFromYearBeginning } from '../../../utils/generate-dates-from-year-beginning'
import { HabitDay } from './HabitDay'

interface Props {}

type Summary = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>

export const SummaryTable = (props: Props) => {
  const [summary, setSummary] = useState<Summary>([])
  const [currentUser] = useRecoilState(currentUserState)

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const summaryDates = generateDatesFromYearBeginning()
  const minimumSummaryDatesSize = 365
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length // "placeholders"

  useEffect(() => {
    api
      .get('/habit/summary', {
        params: {
          user_id: currentUser.id,
        },
      })
      .then((res) => setSummary(res.data))
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={style.overlay} />
      <div className={style.contentContainer}>
        <header className={style.dayWeeksHeader}>
          {weekDays.map((day, index) => (
            <div key={`${weekDays}-${index}`} className={style.day}>
              {day}
            </div>
          ))}
        </header>
        <div className={style.gridContainer}>
          {summary.length > 0 &&
            summaryDates.map((date) => {
              const dayInSummary = summary.find((day) => {
                return dayjs(date).isSame(day.date, 'day')
              })

              return (
                <HabitDay
                  key={date.toString()}
                  date={date}
                  amount={dayInSummary?.amount}
                  defaultCompleted={dayInSummary?.completed}
                />
              )
            })}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <div key={index} className={style.placeholders} />
            ))}
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `max-w-5xl relative h-full`,
  overlay: `inset-y-0 -right-5 md:right-0 z-40 absolute w-[80px] md:w-[180px] bg-gradient-to-r from-transparent via-background to-background`,
  contentContainer: `scroll-style mb-14 md:mb-0 ml-5 md:ml-0 p-4 w-full overflow-x-scroll flex`,
  dayWeeksHeader: `grid grid-rows-7 z-20 bg-background -left-5 md:-left-8 top-4 w-fit h-fit inset-y-0 absolute grid-flow-row gap-3`,
  day: `text-white font-bold text-xl w-10 h-10 flex items-center justify-center`,
  gridContainer: `grid grid-rows-7 grid-flow-col gap-3`,
  placeholders: `w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed`,
}
