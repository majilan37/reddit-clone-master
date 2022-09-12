import { Request, Response } from "express-graphql";
import { User } from "./schema/user";

export interface Context {
  req: Request;
  res: Response;
  user: User;
}
