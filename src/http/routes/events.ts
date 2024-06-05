import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../../lib/prisma";

export async function getEvents(app: FastifyInstance) {
  app.get("/events", async (request, reply) => {
    const findParams = z.object({
      category: z.enum(["next", "suggestions"]),
    });

    findParams.parse(request.query);

    const eventsCount = await prisma.event.count();
    const skip = Math.floor(Math.random() * eventsCount);
    const events = await prisma.event.findMany({
      include: {
        touristicSpot: {
          include: {
            address: true
          }
        },
      },
      take: 5,
      skip,
      orderBy: {
        description: "asc",
      },
    });

    const randomnizedEvents = events.sort(() => Math.random() - 0.5);

    return {
      message: "Eventos listados com sucesso!",
      data: randomnizedEvents,
    };
  });
}
