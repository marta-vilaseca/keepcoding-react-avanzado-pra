import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { withExtraArgument } from "redux-thunk";

import * as reducers from "./reducers";
import * as actionCreators from "./actions";
import * as auth from "../services/loginService";
import * as adverts from "../services/advertsService";
import { failureRedirects, logger, timestamp } from "./middleware";

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(preloadedState, { router }) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        withExtraArgument({ services: { auth, adverts }, router }),
        timestamp,
        failureRedirects(router, {
          401: "/login",
          404: "/404",
        }),
        logger
      )
    )
  );

  return store;
}
