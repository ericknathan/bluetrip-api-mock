import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../../lib/prisma";

export async function createReservation(app: FastifyInstance) {
  app.post("/reservation", async (request, reply) => {
    const createReservationBody = z.object({
      type: z.enum(["touristic-spot", "event"]),
      externalId: z.number(),
      paymentMethod: z.enum(["C", "M", "P"]),
      date: z.coerce.date(),
      quantity: z.number(),
    });

    const userEmail = request.headers["x-user-email"] as string;

    const data = createReservationBody.parse(request.body);

    const reservation = await prisma.reservation.create({
      data: {
        ...data,
        date: data.date.toISOString(),
        status: "PENDING",
        user: {
          connect: {
            email: userEmail,
          },
        },
      },
    });

    return {
      message: "Reserva criada com sucesso!",
      data: reservation,
    };
  });
}

export async function getReservationList(app: FastifyInstance) {
  app.get("/reservation", async (request, reply) => {
    const userEmail = request.headers["x-user-email"] as string;

    const reservations = await prisma.reservation.findMany({
      where: {
        user: {
          email: userEmail,
        },
      },
    });

    return {
      message: "Reservas listadas com sucesso!",
      data: reservations,
    };
  });
}
