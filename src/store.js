import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import {friendRequestsReducer} from './reducers/socketReducer';
import { blogReducer } from "./reducers/blogReducer";



const reducer = combineReducers({
users:userReducer,
socket:friendRequestsReducer,
blogs:blogReducer
})

let inialState = {
}

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  inialState,
  // applyMiddleware(...middleware)
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;