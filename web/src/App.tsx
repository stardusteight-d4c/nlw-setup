import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Header } from './components/Header'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { SummaryTable } from './components/SummaryTable'
import { api } from './lib/axios'

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

    await api.post('/push/register', {
      subscription,
    })

    await api.post('/push/send', {
      subscription,
    })
  })

export const App = (props: Props) => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (user) {
    console.log(user)
  }

  return (
    <>
      <LoginButton />
      {isAuthenticated && (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="w-full max-w-5xl px-6 flex flex-col gap-y-16">
            <Header />
            <SummaryTable />
          </div>
        </div>
      )}
    </>
  )
}
