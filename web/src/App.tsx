import React from 'react'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'

interface Props {}

export const App = (props: Props) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-y-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}
