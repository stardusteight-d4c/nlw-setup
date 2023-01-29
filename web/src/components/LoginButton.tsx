import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { loginWithPopup } = useAuth0()

  return (
    <a
      onClick={() => loginWithPopup()}
      href="#_"
      className="box-border gap-x-1 relative z-30 inline-flex items-center justify-center w-fit px-8 py-3 overflow-hidden font-bold text-white transition-all focus:ring-red-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background bg-red-600 rounded-md cursor-pointer group hover:brightness-125 hover:border-background hover:ring-red-500 ease focus:outline-none"
    >
      <svg
        className="relative w-5 h-5 mr-2 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      Login
    </a>
  )
}

export default LoginButton
