import WebPush from 'web-push'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

// console.log(WebPush.generateVAPIDKeys())

const publicKey = `BAmA8fBVC3iLwrOsykZ5PqpV5p1Ne_9hJn7Bo0rAnM5JZGdG-Lj7L6Ntmhj6IWVZTgkB4thay3yJiOlW5HhUh4Y`
const privateKey = `yggPMzXP-F_rPG-NVd2VTyyEo3plyZSghdG8If3ORF0`

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey)

export async function notificationsRoutes(fastify: FastifyInstance) {
  fastify.get('/push/public_key', () => {
    return {
      publicKey,
    }
  })

  fastify.post('/push/register', (request, reply) => {
    // console.log(request.body)

    return reply.status(201).send()
  })

  fastify.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          auth: z.string(),
          p256dh: z.string(),
        }),
      }),
    })

    const { subscription } = sendPushBody.parse(request.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'Hello World from Backend!')
    }, 5000)

    return reply.status(201).send()
  })
}
