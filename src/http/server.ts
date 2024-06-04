import cors from "@fastify/cors";
import fastify from "fastify";
import { recoverPassword, signIn, signUp } from "./routes/auth";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.register(signIn);
app.register(signUp);
app.register(recoverPassword);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });
