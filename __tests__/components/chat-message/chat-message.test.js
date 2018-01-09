import React from 'react';
import { MuiMountWithContext } from '../../test-utils';

import ChatMessage from '../../../src/js/components/chat-message/chat-message';

describe('ChatMessage component', () => {
    let chatMessage = null;

    const baseProps = {
        userName: 'ilya',
        avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
        messageText: 'qwertyui',
        isOwnMessage: true,
        date: 0,
    };

    it('mounts without crashing', () => {
        chatMessage = <ChatMessage {...baseProps} />;

        const chatMessageComponent = MuiMountWithContext(chatMessage);
        expect(chatMessageComponent).toMatchSnapshot();
    });

    it('should render a user name and messageText', () => {
        chatMessage = <ChatMessage {...baseProps} />;

        const chatMessageComponent = MuiMountWithContext(chatMessage);

        expect(chatMessageComponent.prop('userName')).toEqual('ilya');
        expect(chatMessageComponent.prop('messageText')).toEqual('qwertyui');
    });

    it('check class names', () => {
        chatMessage = <ChatMessage {...baseProps} classNames="test-class" isOptimistic />;

        const chatMessageComponent = MuiMountWithContext(chatMessage);
        const chatMessageNode = chatMessageComponent.find('.chat-message');

        expect(chatMessageNode.hasClass('test-class')).toEqual(true);
        expect(chatMessageNode.hasClass('chat-message_own-message')).toEqual(true);
        expect(chatMessageNode.hasClass('chat-message_optimistic')).toEqual(true);
    });
});
