import { createStore, applyMiddleware, compose } from "redux"
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import rootReducer from "./reducers"
import thunk from "redux-thunk"

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for redux dev tools
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())))
}

