import Fastify from 'fastify'
import cors from '@fastify/cors'
import { authRoutes, habitRoutes, notificationRoutes } from './routes'

const app = Fastify()

app.register(cors, {
  origin: 'http://localhost:5173',
})

app.register(authRoutes, { prefix: '/api/auth' })
app.register(habitRoutes, { prefix: '/api/habit' })
app.register(notificationRoutes, { prefix: '/api/notification' })

app.listen({ port: 3333 }).then((url) => {
  console.log(`🚀 Server ready at ${url}`)
})
