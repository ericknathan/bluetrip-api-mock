import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../../lib/prisma";

export async function signIn(app: FastifyInstance) {
  app.post("/auth/signin", async (request, reply) => {
    const signInBody = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });

    const { email, password } = signInBody.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return reply.status(401).send({
        message: "Credenciais incorretas!",
      });
    }

    const { password: currentPassword, ...userData } = user;
    const passwordMatch = await bcrypt.compare(password, currentPassword);

    if (!passwordMatch) {
      return reply.status(401).send({
        message: "Credenciais incorretas!",
      });
    }

    return {
      message: "Usuário autenticado com sucesso!",
      user: userData,
    };
  });
}

export async function signUp(app: FastifyInstance) {
  app.post("/auth/signup", async (request, reply) => {
    const signUpBody = z.object({
      name: z.string(),
      nationality: z.string(),
      phone: z.string(),
      birthDate: z.coerce.date(),
      gender: z.enum(["m", "f"]),
      language: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    });

    const data = signUpBody.parse(request.body);

    const existentUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existentUser) {
      return reply.status(400).send({
        message: "O e-mail informado já está sendo utilizado!",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 5);

    await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return reply.status(201).send({
      message: "Usuário cadastrado com sucesso!",
    });
  });
}

export async function recoverPassword(app: FastifyInstance) {
  app.post("/auth/recover-password", async (request, reply) => {
    const recoverPasswordBody = z.object({
      email: z.string().email(),
    });

    const { email } = recoverPasswordBody.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return reply.status(404).send({
        message: "Usuário não encontrado!",
      });
    }

    return {
      message:
        "Caso a conta exista, foi enviado um e-mail para recuperação de senha!",
    };
  });
}
