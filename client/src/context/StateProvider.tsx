import React from "react";
import { Action, InitialState } from "../types";

type Reducer = (state: InitialState, action: Action) => InitialState;
const useAppReducer = (reducer: Reducer, initialState: InitialState) =>
  React.useReducer(reducer, initialState);

type State = ReturnType<typeof useAppReducer>[0];
type Dispach = ReturnType<typeof useAppReducer>[1];

const state = {} as State;
const dispatch: Dispach = (value) => {};

type ContextType = [state: State, dispatch: Dispach];

const StateContext = React.createContext<ContextType>([state, dispatch]);

export default function StateProvider({
  children,
  reducer,
  initialState,
}: {
  children: React.ReactNode;
  initialState: InitialState;
  reducer: (state: InitialState, action: Action) => InitialState;
}) {
  return (
    <StateContext.Provider value={React.useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateProvider = () => React.useContext(StateContext);
