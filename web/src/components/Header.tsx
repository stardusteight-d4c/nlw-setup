import React from 'react'
import logoImage from '../assets/logo.svg'
import { Plus } from 'phosphor-react'

interface Props {}

export const Header = (props: Props) => {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="Habits" className="" />
      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-x-3 hover:border-violet-300 transition-all duration-200"
      >
        <Plus size={20} className="text-violet-500" />
        Novo hábito
      </button>
    </header>
  )
}
