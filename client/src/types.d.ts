import { User } from "./generated/graphql";

export type Action =
  | {
      type: "SET_USER";
      payload: Pick<User, "username" | "email" | "_id"> | null;
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    };

export type InitialState = {
  user: Pick<User, "_id" | "username" | "email"> | null;
  isLoading?: boolean;
};
