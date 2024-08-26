import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import { typeDefs } from "./schema/schema.js";
import connectDB from "./config/db.js";
import resolvers from "./resolvers/resolvers.js";

dotenv.config({
  path: "./env",
});

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`);
  });
}

startServer();
