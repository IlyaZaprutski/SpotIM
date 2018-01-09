import React from 'react';
import configureMockStore from 'redux-mock-store';

import { MuiShallowWithContext } from '../test-utils';

import CreateMessageContainer from '../../src/js/containers/create-message-container';

import UserReducerRecord from '../../src/js/records/user-reducer-record';

describe('Create message container', () => {
    const initialState = {
        userInfo: new UserReducerRecord({
            userId: '0',
            userName: 'test',
            avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
        }),
    };
    const mockStore = configureMockStore();
    let store;
    let container;

    beforeEach(() => {
        store = mockStore(initialState);
        container = MuiShallowWithContext(<CreateMessageContainer store={store} />);
    });

    it('should render the CreateMessageForm component', () => {
        expect(container.length).toEqual(1);

        expect(container).toMatchSnapshot();
    });

    it('should render with props from initialState', () => {
        expect(container.prop('userId')).toEqual(initialState.userInfo.userId);
        expect(container.prop('userName')).toEqual(initialState.userInfo.userName);
        expect(container.prop('avatarUrl')).toEqual(initialState.userInfo.avatarUrl);
    });
});
