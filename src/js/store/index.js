import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

import socketMiddleware from '../middlewares/socket-middleware';
import { ENDPOINT_URL, EVENT_NAME, ACTION_PREFIX } from '../constants/spotim-socket-constants';

import { receiveSocketInfo } from '../actions/chat-actions';

import * as appReducers from '../reducers';

const reducer = combineReducers(appReducers);

const spotimSocket = io(ENDPOINT_URL);

const spotimSocketMiddleware = socketMiddleware(
    spotimSocket,
    ACTION_PREFIX,
    EVENT_NAME,
    receiveSocketInfo,
    (eventName, action, emit, next) => {
        emit(eventName, { ...action.payload });
        next(action);
    },
);

export default createStore(reducer, applyMiddleware(thunk, spotimSocketMiddleware));
