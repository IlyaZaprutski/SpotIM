import React from 'react';
import { OrderedMap } from 'immutable';

import { MuiMountWithContext } from '../../test-utils';

import MessageList from '../../../../src/js/components/message-list/message-list';

import MessageRecord from '../../../../src/js/records/message-record';

describe('MessageList component', () => {
    let messageList = null;

    const currentUserId = '0';
    const messages = new OrderedMap([
        [
            '0',
            new MessageRecord({
                id: '0',
                authorId: currentUserId,
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
                id: '0',
                authorId: currentUserId,
                userName: 'testUser1',
                messageText: 'test test',
                date: 0,
                avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
                isOptimistic: false,
            }),
        ],
    ]);

    const baseProps = {
        currentUserId,
        messages,
    };

    it('mounts without crashing', () => {
        messageList = <MessageList {...baseProps} />;

        const messageListComponent = MuiMountWithContext(messageList);
        expect(messageListComponent).toMatchSnapshot();
    });

    it('test className', () => {
        messageList = <MessageList {...baseProps} classNames="test-class" />;

        const messageListComponent = MuiMountWithContext(messageList);
        expect(messageListComponent.props().classNames).toEqual('test-class');
        expect(messageListComponent.find('.message-list').hasClass('test-class')).toEqual(true);
    });
});
