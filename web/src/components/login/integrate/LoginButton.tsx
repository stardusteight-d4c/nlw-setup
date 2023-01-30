import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../../atoms'
import { api } from '../../../lib/axios'
import { Lightning } from 'phosphor-react'

export const LoginButton = () => {
  const { loginWithPopup, user } = useAuth0()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const notAuthenticated = user?.email && currentUser.email === ''

  if (notAuthenticated) {
    api
      .post('/auth/login', {
        email: user.email,
        picture: user.picture,
      })
      .then((res) => {
        setCurrentUser({
          id: res.data.user.id,
          email: res.data.user.email,
          picture: res.data.user.picture,
        })
        localStorage.setItem('session', res.data.sessionToken)
      })
  }

  return (
    <button
      type="button"
      onClick={() => loginWithPopup()}
      className={style.wrapper}
    >
      <Lightning weight="bold" size={20} />
      Login
    </button>
  )
}

const style = {
  wrapper: `box-border gap-x-2 relative z-30 inline-flex items-center justify-center w-fit px-8 py-3 overflow-hidden font-bold text-white transition-all focus:ring-indigo-500 focus:ring-4 focus:ring-offset-2 focus:ring-offset-background bg-indigo-600 rounded-md cursor-pointer group hover:brightness-125 hover:border-background hover:ring-indigo-500 ease focus:outline-none`,
}
