import { Action, InitialState } from "../types";

export const initialState: InitialState = {
  user: JSON.parse(localStorage.getItem("reddit_user") as string) ?? null,
  isLoading: false,
};

export default function reducer(
  state: typeof initialState,
  action: Action
): typeof initialState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
  }
}
