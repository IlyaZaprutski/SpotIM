import React from 'react';
import configureMockStore from 'redux-mock-store';
import { OrderedMap } from 'immutable';
import { Provider } from 'react-redux';

import { MuiShallowWithContext, MuiMountWithContext } from '../../test-utils';

import ChatRoom from '../../../../src/js/components/chat-room/chat-room';

import UserReducerRecord from '../../../../src/js/records/user-reducer-record';
import MessageRecord from '../../../../src/js/records/message-record';

describe('ChatRoom component', () => {
    let chatRoom = null;

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

    it('shallow without crashing', () => {
        chatRoom = <ChatRoom initUser={() => {}} />;

        const chatRoomComponent = MuiShallowWithContext(chatRoom);
        expect(chatRoomComponent).toMatchSnapshot();
    });

    it('should call initUser on componentDidMount', () => {
        const store = mockStore(initialState);

        const initUser = jest.fn();

        chatRoom = (
            <Provider store={store}>
                <ChatRoom initUser={initUser} />
            </Provider>
        );

        expect(initUser).not.toHaveBeenCalled();

        MuiMountWithContext(chatRoom);

        expect(initUser).toHaveBeenCalled();
    });
});
