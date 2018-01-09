import React from 'react';
import configureMockStore from 'redux-mock-store';

import { MuiShallowWithContext } from '../test-utils';

import ChatRoomContainer from '../../src/js/containers/chat-room-container';

describe('Chat room container', () => {
    const mockStore = configureMockStore();
    let store;
    let container;

    beforeEach(() => {
        store = mockStore({});
        container = MuiShallowWithContext(<ChatRoomContainer store={store} />);
    });

    it('should render the ChatRoom component', () => {
        expect(container.length).toEqual(1);

        expect(container).toMatchSnapshot();
    });
});
