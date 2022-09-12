import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import StateProvider from "./context/StateProvider";
import reducer, { initialState } from "./context/reducer";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      keyFields: ["_id"],
      fields: {
        posts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "/api/__graphql",
  cache,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
