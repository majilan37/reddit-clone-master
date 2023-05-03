import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Context } from "./types";
import jwt from "jsonwebtoken";
import { User } from "./schema/user";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
dotenv.config();

(async () => {
  // * App config
  const app = express();
  const PORT = process.env.PORT || 5000;

  // * Create a schema
  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/*.ts"],
    authChecker: ({ context: { req } }: { context: Context }): boolean => {
      return !!req.cookies.accesstoken;
    },
  });

  // * Create Apollo Server
  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      if (ctx.req.cookies.accesstoken) {
        const user = jwt.verify(
          ctx.req.cookies.accesstoken,
          process.env.JWT_SECRET || ""
        ) as User;
        ctx.user = user;
      }
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
    cache: "bounded",
    formatError: (err) => ({
      message: err.message,
    }),
  });

  // * Start Server
  await server.start();

  // * Middleware
  app.use(cookieParser());
  server.applyMiddleware({ app, path: "/api/__graphql" });

  // * Serve client
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(__dirname, "../", "client", "dist", "index.html")
      );
    });
  } else {
    app.get("/", (req, res) => {
      res.send("Please run npm run build");
    });
  }

  // * DB config
  mongoose.connect(process.env.MONGODB_URI as string, () =>
    console.log("Connected to Mongo DB")
  );

  // * Listner
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
