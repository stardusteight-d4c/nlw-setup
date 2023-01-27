import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'
import { notificationsRoutes } from './notifications-routes'

const app = Fastify()


app.register(cors, {
  origin: 'http://localhost:5173',
})

app.register(appRoutes)
app.register(notificationsRoutes)

app
  .listen({
    port: 3333,
  })
  .then((url) => console.log(`🚀 Server ready at ${url}`))
