import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { taskReducer, dataReducer, searchDataReducer, sortByReduser, isChangeReducer, isLoadingReducer } from './redusers'
import { thunk } from "redux-thunk";

const reduser = combineReducers({
	taskState: taskReducer,
	dataState: dataReducer,
	searchState: searchDataReducer,
	sortByState: sortByReduser,
	isChangeState: isChangeReducer,
	isLoadingState: isLoadingReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reduser, composeEnhancers(applyMiddleware(thunk)),)
