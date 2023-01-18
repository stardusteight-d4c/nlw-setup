import React from 'react'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { HabitDay } from './HabitDay'

interface Props {}

export const SummaryTable = (props: Props) => {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const summaryDates = generateDatesFromYearBeginning()

  const minimumSummaryDatesSize = 18 * 7 // 18 weeks
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length // "placeholders"

  return (
    <div className="w-full flex">
      <header className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div
            key={`${weekDays}-${index}`}
            className="text-zinc-400 font-bold text-xl w-10 h-10 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </header>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date, index) => (
          <HabitDay key={date.toString()} />
        ))}

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
