import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
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

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const summaryDates = generateDatesFromYearBeginning()
  const minimumSummaryDatesSize = 365 
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length // "placeholders"

  useEffect(() => {
    api.get('summary').then((res) => setSummary(res.data))
  }, [])

  return (
    <div className="scroll-style p-4 w-full overflow-x-scroll flex">
      <header className="grid grid-rows-7 z-20 bg-background/70 -ml-14 z-fit h-fit fixed grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div
            key={`${weekDays}-${index}`}
            className="text-white font-bold text-xl w-10 h-10 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </header>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 && summaryDates.map((date, index) => {
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
            <div
              key={index}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  )
}
