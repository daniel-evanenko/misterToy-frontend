import { modalReducer } from "./reducers/modal.reducer.js";
import { toyReducer } from "./reducers/toy.reducer.js";
import { userReducer } from "./reducers/user.reducer.js";
import { createStore, combineReducers, compose } from "redux";

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    modalModule: modalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers());

window.gStore = store;
