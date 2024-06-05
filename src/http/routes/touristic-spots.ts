import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../../lib/prisma";

export async function getTouristicSpots(app: FastifyInstance) {
  app.get("/touristic-spots", async (request, reply) => {
    const findParams = z.object({
      category: z.enum(["near", "popular", "recommended"]),
    });

    findParams.parse(request.query);

    const touristicSpotsCount = await prisma.touristicSpot.count();
    const skip = Math.floor(Math.random() * touristicSpotsCount);
    const touristicSpots = await prisma.touristicSpot.findMany({
      include: {
        events: true,
      },
      take: 5,
      skip,
      orderBy: {
        description: "asc",
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
