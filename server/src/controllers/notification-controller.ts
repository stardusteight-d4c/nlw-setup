import WebPush from "web-push";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// get Public and Private Key
// console.log(WebPush.generateVAPIDKeys())

const publicKey = `BAmA8fBVC3iLwrOsykZ5PqpV5p1Ne_9hJn7Bo0rAnM5JZGdG-Lj7L6Ntmhj6IWVZTgkB4thay3yJiOlW5HhUh4Y`;
const privateKey = process.env.NOTIFICATION_PRIVATE_KEY!;

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export class NotificationController {
  async publicKey() {
    try {
      return {
        publicKey,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async register(_: FastifyRequest, reply: FastifyReply) {
    try {
      return reply.status(201).send();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async send(request: FastifyRequest, reply: FastifyReply) {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          auth: z.string(),
          p256dh: z.string(),
        }),
      }),
      user: z.string(),
    });

    try {
      const { subscription, user } = sendPushBody.parse(request.body);
      // setTimeout(() => {
      //   WebPush.sendNotification(
      //     subscription,
      //     `Bom te ver novamente! ${user.split('@')[0]}`
      //   )
      // }, 1000)
      WebPush.sendNotification(
        subscription,
        `Bom te ver novamente! ${user.split("@")[0]}`,
      );
      return reply.status(201).send();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
