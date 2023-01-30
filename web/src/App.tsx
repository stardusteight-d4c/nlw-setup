import { useRecoilState } from 'recoil'
import { api } from './lib/axios'
import { currentUserState } from './atoms/index'
import { useEffect, useState } from 'react'
import { Loader } from './components/Loader'
import { handleNotifications } from './utils/handleNotifications'
import { HabitTracker } from './components/habit-tracker/HabitTracker'
import { Login } from './components/login/Login'

interface Props {}

export const App = (props: Props) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const session = localStorage.getItem('session')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (session) {
      api
        .get('/auth/session', {
          headers: {
            authorization: session,
          },
        })
        .then((res) =>
          setCurrentUser({
            id: res.data.user.id,
            email: res.data.user.email,
            picture: res.data.user.picture,
          })
        )
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [session])

  handleNotifications(currentUser)

  const rendersContent = () => {
    const isAuthenticated = currentUser.email !== ''

    return (
      (loading && <Loader />) ||
      (isAuthenticated ? <HabitTracker setLoading={setLoading} /> : <Login />)
    )
  }

  return (
    <>
      <div className={style.wrapper}>{rendersContent()}</div>
    </>
  )
}

const style = {
  wrapper: `w-screen h-screen overflow-x-hidden flex items-center justify-center`,
}
