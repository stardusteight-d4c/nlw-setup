import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilState } from 'recoil'
import logoImage from './assets/logo.svg'
import { Header } from './components/Header'
import LoginButton from './components/LoginButton'
import { SummaryTable } from './components/SummaryTable'
import { api } from './lib/axios'
import { currentUserState } from './atoms/index'
import { useEffect, useState } from 'react'

interface Props {}

// window.Notification.requestPermission((permission) => {
//   if (permission === 'granted') {
//     new window.Notification('Habits', {
//       body: 'Text',
//     })
//   }
//   // Local Notification => Scheduling / App closed
// })

navigator.serviceWorker
  .register('service-worker.js')
  .then(async (serviceWorker) => {
    let subscription = await serviceWorker.pushManager.getSubscription()

    if (!subscription) {
      const publicKeyResponse = await api.get('/push/public_key')

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyResponse.data.publicKey,
      })
    }

    await api.post('/notification/register', {
      subscription,
    })

    await api.post('/notification/send', {
      subscription,
    })
  })

export const App = (props: Props) => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const session = localStorage.getItem('session')
  const [loading, setLoading] = useState<boolean>(true)

  console.log('currentUser', currentUser)

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
    setLoading(false)
  }, [session])

  if (loading) {
    return <div>Loading ...</div>
  }

  if (user?.email && currentUser.email === '') {
    api
      .post('/auth/login', {
        email: user.email,
        picture: user.picture,
      })
      .then((res) => {
        localStorage.setItem('session', res.data)
        setCurrentUser({
          id: res.data.user.id,
          email: res.data.user.email,
          picture: res.data.user.picture,
        })
      })
    setLoading(false)
  }

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        {currentUser.email !== '' ? (
          <div className="w-full max-w-5xl px-6 flex flex-col gap-y-16">
            <Header />
            <SummaryTable />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-y-24">
            <img src={logoImage} alt="Habits" className="w-56" />
            <LoginButton />
          </div>
        )}
      </div>
    </>
  )
}
