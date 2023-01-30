import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { SignOut } from 'phosphor-react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../atoms'

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LogoutButton = ({ setLoading }: Props) => {
  const { logout } = useAuth0()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)

  return (
    <button
      onClick={() => {
        setLoading(true)
        localStorage.removeItem('session')
        setCurrentUser({
          id: '',
          email: '',
          picture: '',
        })
        logout()
      }}
      type="button"
      className="box-border gap-x-2 relative z-30 inline-flex items-center justify-center w-fit px-8 py-3 overflow-hidden font-base text-red-500 transition-all focus:ring-red-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background border border-red-600 rounded-md cursor-pointer group hover:brightness-125 hover:ring-red-500 ease focus:outline-none"
    >
      <SignOut size={20} weight="regular" className="text-red-500" />
      Logout
    </button>
  )
}

export default LogoutButton
