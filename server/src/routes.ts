import { FastifyInstance } from 'fastify'
import { AuthController } from './controllers/auth-controller'
import { HabitController } from './controllers/habit-controller'
import { NotificationController } from './controllers/notification-controller'

const authController = new AuthController()
const habitController = new HabitController()
const notificationController = new NotificationController()

async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', authController.login)
  fastify.get('/session', authController.session)
}

async function habitRoutes(fastify: FastifyInstance) {
  fastify.post('/create', habitController.create)
  fastify.get('/day', habitController.day)
  fastify.get('/:id/toggle', habitController.toggleHabit)
  fastify.get('/summary', habitController.summary)
}

async function notificationRoutes(fastify: FastifyInstance) {
  fastify.get('/public_key', notificationController.publicKey)
  fastify.post('/register', notificationController.register)
  fastify.post('/send', notificationController.send)
}

export { authRoutes, habitRoutes, notificationRoutes }
