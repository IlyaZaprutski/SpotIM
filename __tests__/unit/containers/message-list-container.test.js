import React from 'react';
import configureMockStore from 'redux-mock-store';
import { OrderedMap } from 'immutable';

import { MuiShallowWithContext } from '../test-utils';

import MessageListContainer from '../../../src/js/containers/message-list-container';

import UserReducerRecord from '../../../src/js/records/user-reducer-record';
import MessageRecord from '../../../src/js/records/message-record';

describe('Message list container', () => {
    const messages = new OrderedMap([
        [
            '0',
            new MessageRecord({
                id: '0',
                authorId: '0',
                userName: 'testUser1',
                messageText: 'test',
                date: 0,
                avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
                isOptimistic: false,
            }),
        ],
        [
            '1',
            new MessageRecord({
                id: '1',
                authorId: '1',
                userName: 'testUser2',
                messageText: 'test testUser2',
                date: 0,
                avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
                isOptimistic: false,
            }),
        ],
        [
            '2',
            new MessageRecord({
                id: '2',
                authorId: '0',
                userName: 'testUser1',
                messageText: 'test test',
                date: 0,
                avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
                isOptimistic: false,
            }),
        ],
    ]);

    const initialState = {
        userInfo: new UserReducerRecord({
            userId: '0',
            userName: 'test',
            avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
        }),
        messages,
    };
    const mockStore = configureMockStore();
    let store;
    let container;

    beforeEach(() => {
        store = mockStore(initialState);
        container = MuiShallowWithContext(<MessageListContainer store={store} />);
    });

    it('should render the MessageList component', () => {
        expect(container.length).toEqual(1);

        expect(container).toMatchSnapshot();
    });

    it('should render with props from initialState', () => {
        expect(container.prop('messages')).toEqual(initialState.messages);
        expect(container.prop('currentUserId')).toEqual(initialState.userInfo.userId);
    });
});
