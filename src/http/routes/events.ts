import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../../lib/prisma";

export async function getEvents(app: FastifyInstance) {
  app.get("/events", async (request, reply) => {
    const findParams = z.object({
      category: z.enum(["next", "suggestions"]),
    });

    findParams.parse(request.query);

    const events = await prisma.event.findMany({
      include: {
        touristicSpot: true,
      },
    });

    const randomnizedEvents = events.sort(() => Math.random() - 0.5);

    return {
      message: "Eventos listados com sucesso!",
      data: randomnizedEvents,
    };
  });
}
