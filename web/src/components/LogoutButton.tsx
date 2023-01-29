import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { SignIn, SignOut } from 'phosphor-react'

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      type="button"
      className="box-border gap-x-2 relative z-30 inline-flex items-center justify-center w-fit px-8 py-3 overflow-hidden font-base text-red-500 transition-all focus:ring-red-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background border border-red-600 rounded-md cursor-pointer group hover:brightness-125 hover:ring-red-500 ease focus:outline-none"
    >
      <SignOut size={20} weight="regular" className="text-red-500" />
      Logout
    </button>
  )
}

export default LogoutButton
