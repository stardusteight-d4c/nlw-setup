import { api } from '../lib/axios'

// window.Notification.requestPermission((permission) => {
//   if (permission === 'granted') {
//     new window.Notification('Habits', {
//       body: 'Text',
//     })
//   }
//   // Local Notification => Scheduling / App closed
// })

export function handleNotifications(currentUser: {
  id: string
  email: string
  picture: string
}) {
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

      if (currentUser.email !== '')
        await api.post('/notification/send', {
          subscription,
          user: currentUser.email,
        })
    })
}
