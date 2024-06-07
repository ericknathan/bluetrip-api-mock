import { FastifyInstance } from "fastify";

import { businessImages } from "../../lib/images";
import { prisma } from "../../lib/prisma";

export async function getLocalBusinessList(app: FastifyInstance) {
  app.get("/local-business", async (request, reply) => {
    const localBusiness = await prisma.localBusiness.findMany({});

    const randomnizedLocalBusiness = localBusiness
      .sort(() => Math.random() - 0.5)
      .sort((a, b) =>
        ["ONG", "Passeios Turísticos", "Centro de mergulho"].includes(
          a.businessCategory
        ) ? -1 : 1
      );

    return {
      message: "Comércios locais listados com sucesso!",
      data: randomnizedLocalBusiness.map((business) => ({
        ...business,
        imageUrl: businessImages[business.businessCategory],
      })),
    };
  });
}
