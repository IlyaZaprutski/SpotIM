import React from 'react';
import { MuiShallowWithContext } from '../../test-utils';

import CreateMessageForm from '../../../../src/js/components/create-message-form/create-message-form';

describe('CreateMessageForm component', () => {
    let createMessageForm = null;

    const baseProps = {
        userName: 'test',
        avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
        onChangeUserName: jest.fn(),
        onSendMessage: jest.fn(),
        onUpdateUserInfo: jest.fn(),
    };

    it('is shallow rendered without crashing', () => {
        createMessageForm = <CreateMessageForm {...baseProps} />;

        const createMessageFormComponent = MuiShallowWithContext(createMessageForm);
        expect(createMessageFormComponent).toMatchSnapshot();
    });

    it('test className', () => {
        createMessageForm = <CreateMessageForm {...baseProps} classNames="test-class" />;

        const createMessageFormComponent = MuiShallowWithContext(createMessageForm);
        expect(createMessageFormComponent.find('.create-message-form').hasClass('test-class')).toEqual(true);
    });

    it('should pass a user name to the onChange handler', () => {
        const onChangeUserName = jest.fn();

        createMessageForm = (
            <CreateMessageForm {...baseProps} onChangeUserName={onChangeUserName} />
        );

        const createMessageFormComponent = MuiShallowWithContext(createMessageForm);

        createMessageFormComponent
            .find('.create-message-form__user-name-input')
            .simulate('change', undefined, 'test qwertyui');

        expect(onChangeUserName).toBeCalledWith('test qwertyui');
    });

    it('should pass a text message to the onChange handler', () => {
        createMessageForm = <CreateMessageForm {...baseProps} />;

        const createMessageFormComponent = MuiShallowWithContext(createMessageForm);

        createMessageFormComponent
            .find('.create-message-form__text-message-input')
            .simulate('change', undefined, 'test text message');

        expect(createMessageFormComponent.state().messageText).toEqual('test text message');
    });

    it('should call onSendMessage props', () => {
        const onSendMessage = jest.fn();

        createMessageForm = <CreateMessageForm {...baseProps} onSendMessage={onSendMessage} />;

        const createMessageFormComponent = MuiShallowWithContext(createMessageForm);

        createMessageFormComponent.setState({ messageText: 'messageText' });

        createMessageFormComponent.find('.create-message-form__send-btn').simulate('click');

        expect(onSendMessage).toBeCalledWith('messageText');
    });

    it('should call onUpdateUserInfo props', () => {
        const onUpdateUserInfo = jest.fn();

        createMessageForm = (
            <CreateMessageForm {...baseProps} onUpdateUserInfo={onUpdateUserInfo} />
        );

        const createMessageFormComponent = MuiShallowWithContext(createMessageForm);
        const userNameInput = createMessageFormComponent.find('.create-message-form__user-name-input');

        userNameInput.simulate('change', undefined, 'testUser');
        userNameInput.simulate('blur', { target: { value: 'testUser' } });

        expect(onUpdateUserInfo).toBeCalledWith('testUser');
    });

    it('should not call onUpdateUserInfo props', () => {
        const onUpdateUserInfo = jest.fn();

        createMessageForm = (
            <CreateMessageForm {...baseProps} onUpdateUserInfo={onUpdateUserInfo} />
        );

        const createMessageFormComponent = MuiShallowWithContext(createMessageForm);
        const userNameInput = createMessageFormComponent.find('.create-message-form__user-name-input');

        userNameInput.simulate('blur', { target: { value: '' } });
        expect(onUpdateUserInfo).not.toHaveBeenCalled();

        userNameInput.simulate('blur', { target: { value: ' asd 123 ' } });
        expect(onUpdateUserInfo).not.toHaveBeenCalled();
    });

    it('check validation onSendMessage', () => {
        const onSendMessage = jest.fn();

        createMessageForm = <CreateMessageForm {...baseProps} onSendMessage={onSendMessage} />;

        const createMessageFormComponent = MuiShallowWithContext(createMessageForm);

        createMessageFormComponent.setState({ messageText: 'test text message' });

        const textMessageInput = createMessageFormComponent.find('.create-message-form__text-message-input');

        textMessageInput.simulate('keyDown', {
            keyCode: 15,
            shiftKey: false,
            preventDefault: () => {},
        });
        expect(onSendMessage).not.toHaveBeenCalled();

        textMessageInput.simulate('keyDown', {
            keyCode: 13,
            shiftKey: false,
            preventDefault: () => {},
        });
        expect(onSendMessage).toHaveBeenCalled();
    });
});
