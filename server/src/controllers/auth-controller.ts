import { FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export class AuthController {
  async login(request: FastifyRequest) {
    const createUserBody = z.object({
      email: z.string(),
      picture: z.string(),
    })

    const { email, picture } = createUserBody.parse(request.body)

    let user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          picture,
        },
      })
    }

    const sessionToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: '4d',
      }
    )

    return { sessionToken, user }
  }

  async session(request: FastifyRequest) {
    const sessionTokenAuthorization = z.string()

    const sessionToken = sessionTokenAuthorization.parse(
      request.headers.authorization
    )

    try {
      const decode: any = jwt.verify(sessionToken, process.env.JWT_SECRET!)

      if (decode) {
        const user = await prisma.user.findFirst({
          where: {
            id: decode.id,
          },
        })
        if (user) {
          return { user, decodedToken: decode }
        }
      }
      return { status: false, message: 'Invalid or expired token.' }
    } catch (error: any) {
      return { status: false, message: error }
    }
  }
}
