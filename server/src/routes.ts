import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from './lib/prisma'
import { z } from 'zod'
import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function appRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/user',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const createUserBody = z.object({
        email: z.string(),
        picture: z.string(),
      })

      const { email, picture } = createUserBody.parse(request.body)

      let user = await prisma.user.findUnique({
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

      return sessionToken
    }
  )

  fastify.post(
    '/habits',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const createHabitBody = z.object({
        title: z.string(),
        weekDays: z.array(z.number().min(0).max(6)),
      })

      const { title, weekDays } = createHabitBody.parse(request.body)

      const today = dayjs().startOf('day').toDate()

      await prisma.habit.create({
        data: {
          title,
          created_at: today,
          weekDays: {
            create: weekDays.map((weekDay) => {
              return {
                week_day: weekDay,
              }
            }),
          },
        },
      })
    }
  )

  fastify.get(
    '/session',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const sessionTokenAuthorization = z.string()

      const sessionToken = sessionTokenAuthorization.parse(
        request.headers.authorization
      )

      try {
        const decode: any = jwt.verify(sessionToken, process.env.JWT_SECRET!)
        console.log('decode', decode);
        
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
  )

  fastify.get('/day', async (request: FastifyRequest, reply: FastifyReply) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDayParams.parse(request.query)

    const parseDate = dayjs(date).startOf('day')
    const weekDay = parseDate.get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parseDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    })

    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id
      }) ?? []

    return {
      possibleHabits,
      completedHabits,
    }
  })

  fastify.patch(
    '/habits/:id/toggle',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const toggleHabitParams = z.object({
        id: z.string().uuid(),
      })

      const { id } = toggleHabitParams.parse(request.params)

      const today = dayjs().startOf('day').toDate()

      let day = await prisma.day.findUnique({
        where: {
          date: today,
        },
      })

      if (!day) {
        day = await prisma.day.create({
          data: {
            date: today,
          },
        })
      }

      const dayHabit = await prisma.dayHabit.findUnique({
        where: {
          day_id_habit_id: {
            day_id: day.id,
            habit_id: id,
          },
        },
      })

      if (dayHabit) {
        await prisma.dayHabit.delete({
          where: {
            id: dayHabit.id,
          },
        })
      } else {
        await prisma.dayHabit.create({
          data: {
            day_id: day.id,
            habit_id: id,
          },
        })
      }
    }
  )

  fastify.get(
    '/summary',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const summary = await prisma.$queryRaw`
      SELECT D.id, D.date, 
      (SELECT cast(count(*) as float) 
        FROM day_habits DH 
        WHERE DH.day_id = D.id
      ) as completed,
      (SELECT cast(count(*) as float)
        FROM habit_week_days HWD
        JOIN habits H
        ON H.id = HWD.habit_id
        WHERE HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
        AND H.created_at <= D.date
      ) as amount
      FROM days D
    `
      return summary
    }
  )
}
