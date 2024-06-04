import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../../lib/prisma";

export async function getTouristicSpots(app: FastifyInstance) {
  app.get("/touristic-spots", async (request, reply) => {
    const findParams = z.object({
      category: z.enum(["near", "popular", "recommended"]),
    });

    findParams.parse(request.query);

    const touristicSpots = await prisma.touristicSpot.findMany({
      include: {
        events: true,
      },
    });

    const randomnizedTouristicSpots = touristicSpots.sort(
      () => Math.random() - 0.5
    );

    return {
      message: "Pontos turísticos listados com sucesso!",
      data: randomnizedTouristicSpots,
    };
  });
}
