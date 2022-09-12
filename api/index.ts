import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Context } from "./types";
import jwt from "jsonwebtoken";
import { User } from "./schema/user";
import path from "path";
dotenv.config();

// * App config
const app = express();
const PORT = process.env.PORT || 5000;

(async () => {
  // * Create a schema
  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/*.ts"],
    authChecker: ({ context: { req } }: { context: Context }): boolean => {
      return !!req.cookies.accesstoken;
    },
  });

  // * Middleware
  app.use(cookieParser());
  app.use(
    "/api/__graphql",
    graphqlHTTP((req, res, graphQLParams) => ({
      schema,
      graphiql: process.env.NODE_ENV !== "production",
      context: {
        req,
        res,
        user: req.cookies.accesstoken
          ? (jwt.verify(
              req.cookies.accesstoken,
              process.env.JWT_SECRET ?? ""
            ) as User)
          : null,
      },
      customFormatErrorFn: (error) => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack,
        path: error.path,
      }),
    }))
  );

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

export default app;
