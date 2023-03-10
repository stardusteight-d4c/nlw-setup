import { FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";
import dotenv from "dotenv";

dotenv.config();

export class HabitController {
  async create(request: FastifyRequest) {
    const createHabitBody = z.object({
      title: z.string(),
      userId: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    try {
      const { title, weekDays, userId } = createHabitBody.parse(request.body);
      const today = dayjs().startOf("day").toDate();
      await prisma.habit.create({
        data: {
          userId,
          title,
          created_at: today,
          weekDays: {
            create: weekDays.map((weekDay) => {
              return {
                week_day: weekDay,
              };
            }),
          },
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async day(request: FastifyRequest) {
    const getDayParams = z.object({
      date: z.coerce.date(),
      userId: z.string(),
    });

    try {
      const { date, userId } = getDayParams.parse(request.query);
      const parseDate = dayjs(date).startOf("day");
      const weekDay = parseDate.get("day");
      const possibleHabits = await prisma.habit.findMany({
        where: {
          userId,
          created_at: {
            lte: date,
          },
          weekDays: {
            some: {
              week_day: weekDay,
            },
          },
        },
      });
      const day = await prisma.day.findFirst({
        where: {
          date: parseDate.toDate(),
          userId,
        },
        include: {
          dayHabits: true,
        },
      });
      const completedHabits =
        day?.dayHabits.map((dayHabit) => {
          return dayHabit.habit_id;
        }) ?? [];
      return {
        possibleHabits,
        completedHabits,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async toggleHabit(request: FastifyRequest) {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });
    const toggleHabitQuery = z.object({
      user_id: z.string().uuid(),
    });

    try {
      const { id } = toggleHabitParams.parse(request.params);
      const { user_id } = toggleHabitQuery.parse(request.query);
      const today = dayjs().startOf("day").toDate();
      let day = await prisma.day.findFirst({
        where: {
          userId: user_id,
          date: today,
        },
      });
      if (!day) {
        day = await prisma.day.create({
          data: {
            userId: user_id,
            date: today,
          },
        });
      }
      const dayHabit = await prisma.dayHabit.findUnique({
        where: {
          day_id_habit_id: {
            day_id: day.id,
            habit_id: id,
          },
        },
      });
      if (dayHabit) {
        await prisma.dayHabit.delete({
          where: {
            id: dayHabit.id,
          },
        });
      } else {
        await prisma.dayHabit.create({
          data: {
            day_id: day.id,
            habit_id: id,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async summary(request: FastifyRequest) {
    const summaryQueryString = z.object({
      user_id: z.string().uuid(),
    });

    try {
      const { user_id } = summaryQueryString.parse(request.query);
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
        AND H.userId = ${user_id}
      ) as amount
      FROM days D 
      WHERE userId = ${user_id}
      `;
      return summary;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
