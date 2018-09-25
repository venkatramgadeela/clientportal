import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer } from 'react-router-redux';

// import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import createHistory from 'history/createBrowserHistory';

// Reducers
import auth from './services/Auth/reducer';
import users from './services/Users/reducer';

// Combine all available reducers
const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users
});

export const history = createHistory();

// Initialize state, enhancers, and configure middleware
const initialState = {};
const enhancers = [];
const middleware = [promise(), thunk, routerMiddleware(history)];

// Composing Middleware and Enhancers
const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
);

// Creating Store with Root Reducer, Initial State, and Middleware
const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;



