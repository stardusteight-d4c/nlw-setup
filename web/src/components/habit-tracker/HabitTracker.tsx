import React from 'react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../atoms'
import { Header } from './integrate/Header'
import { SummaryTable } from './integrate/SummaryTable'

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const HabitTracker = ({ setLoading }: Props) => {
  const [currentUser] = useRecoilState(currentUserState)

  return (
    <main className={style.mainContent}>
      <Header setLoading={setLoading} />
      <span className={style.welcomeSpan}>
        Bem vindo, {currentUser.email.split('@')[0]}!
      </span>
      <SummaryTable />
    </main>
  )
}

const style = {
  mainContent: `w-full relative max-w-5xl px-6 flex flex-col gap-y-16`,
  welcomeSpan: `absolute top-[118px] left-10 z-50 text-zinc-600`,
}
