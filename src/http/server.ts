import cors from "@fastify/cors";
import fastify from "fastify";
import "dotenv/config";

import { recoverPassword, signIn, signUp } from "./routes/auth";
import { getEvents } from "./routes/events";
import { getLocalBusinessList } from "./routes/local-business";
import { createReservation, getReservationList } from "./routes/reservation";
import { getTouristicSpots } from "./routes/touristic-spots";

const port = process.env.PORT || 10000;
const app = fastify();

app.register(cors, {
  origin: "*",
});

app.register(signIn);
app.register(signUp);
app.register(recoverPassword);

app.register(getTouristicSpots);

app.register(getEvents);

app.register(getLocalBusinessList);

app.register(createReservation);
app.register(getReservationList);

app
  .listen({
    port
  })
  .then(() => {
    console.log("Server is running on port " + port);
  });
