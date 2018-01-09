import { OrderedMap } from 'immutable';

import messagesReducer from '../../../src/js/reducers/messages-reducer';

import MessageRecord from '../../../src/js/records/message-record';

describe('Messages reducer', () => {
    const message = {
        id: '0',
        authorId: '0',
        userName: 'testUser',
        messageText: 'test message',
        avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
        date: 0,
        isOptimistic: true,
    };

    it('should return the initial state', () => {
        expect(messagesReducer(undefined, {})).toEqual(new OrderedMap());
    });

    it('should react to an action sendOptimisticMessage', () => {
        expect(messagesReducer(undefined, {
            type: 'SEND_OPTIMISTIC_MESSAGE',
            payload: { ...message },
        })).toEqual(new OrderedMap([[message.id, new MessageRecord(message)]]));
    });

    it('should react to an action receiveMessage', () => {
        expect(messagesReducer(undefined, {
            type: 'RECEIVE_MESSAGE',
            payload: { ...message },
        })).toEqual(new OrderedMap([[message.id, new MessageRecord(message)]]));
    });
});
