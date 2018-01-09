import { combineActions, handleActions } from 'redux-actions';
import { OrderedMap } from 'immutable';

import { sendOptimisticMessage, receiveMessage } from '../actions/chat-actions';

import MessageRecord from '../records/message-record';

export default handleActions(
    {
        [combineActions(sendOptimisticMessage, receiveMessage)]: (state, action) => {
            const {
                id,
                authorId,
                userName,
                avatarUrl,
                messageText,
                date,
                isOptimistic,
            } = action.payload;

            return state.set(
                id,
                new MessageRecord({
                    id,
                    authorId,
                    userName,
                    messageText,
                    avatarUrl,
                    date,
                    isOptimistic,
                }),
            );
        },
    },
    new OrderedMap(),
);
