import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../../lib/prisma";

export async function getLocalBusinessList(app: FastifyInstance) {
  app.get("/local-business", async (request, reply) => {
    const localBusiness = await prisma.localBusiness.findMany({});

    const randomnizedLocalBusiness = localBusiness.sort(
      () => Math.random() - 0.5
    );

    return {
      message: "Comércios locais listados com sucesso!",
      data: randomnizedLocalBusiness,
    };
  });
}
