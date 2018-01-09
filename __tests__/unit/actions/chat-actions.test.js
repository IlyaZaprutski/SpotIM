import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    sendMessageToServer,
    sendOptimisticMessage,
    receiveMessage,
    sendMessage,
} from '../../../src/js/actions/chat-actions';

import { ACTION_PREFIX } from '../../../src/js/constants/spotim-socket-constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mapSendMessageToServerAction = (action) => {
    const {
        authorId, username, avatar, text,
    } = action.payload;
    return {
        type: action.type,
        payload: {
            authorId,
            userName: username,
            avatarUrl: avatar,
            messageText: text,
        },
    };
};

const mapSendOptimisticMessageAction = (action) => {
    const {
        authorId, userName, avatarUrl, messageText, isOptimistic,
    } = action.payload;

    return {
        type: action.type,
        payload: {
            authorId,
            userName,
            avatarUrl,
            messageText,
            isOptimistic,
        },
    };
};

describe('Chat actions', () => {
    const messageInfo = {
        id: '0',
        authorId: '0',
        userName: 'test',
        avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
        messageText: 'text message',
        date: 0,
    };

    it('should create an action to send optimistic message', () => {
        expect(sendOptimisticMessage(
            messageInfo.id,
            messageInfo.authorId,
            messageInfo.userName,
            messageInfo.avatarUrl,
            messageInfo.messageText,
            messageInfo.date,
        )).toEqual({
            type: 'SEND_OPTIMISTIC_MESSAGE',
            payload: {
                ...messageInfo,
                isOptimistic: true,
            },
        });
    });

    it('should create an action to receive message', () => {
        expect(receiveMessage({
            id: messageInfo.id,
            authorId: messageInfo.authorId,
            username: messageInfo.userName,
            avatar: messageInfo.avatarUrl,
            text: messageInfo.messageText,
            date: messageInfo.date,
        })).toEqual({
            type: 'RECEIVE_MESSAGE',
            payload: {
                ...messageInfo,
                isOptimistic: false,
            },
        });
    });

    it('should create an action to send message to server', () => {
        expect(sendMessageToServer(
            messageInfo.id,
            messageInfo.authorId,
            messageInfo.userName,
            messageInfo.avatarUrl,
            messageInfo.messageText,
            messageInfo.date,
        )).toEqual({
            type: `${ACTION_PREFIX}SEND_MESSAGE_TO_SERVER`,
            payload: {
                id: messageInfo.id,
                authorId: messageInfo.authorId,
                username: messageInfo.userName,
                avatar: messageInfo.avatarUrl,
                text: messageInfo.messageText,
                date: messageInfo.date,
            },
        });
    });

    it('creates SEND_OPTIMISTIC_MESSAGE and SEND_MESSAGE_TO_SERVER when send message', () => {
        const store = mockStore({
            userInfo: {
                userId: messageInfo.authorId,
                userName: messageInfo.userName,
                avatarUrl: messageInfo.avatarUrl,
            },
        });

        store.dispatch(sendMessage(messageInfo.messageText));

        const storeActions = store.getActions();

        expect([
            mapSendOptimisticMessageAction(storeActions[0]),
            mapSendMessageToServerAction(storeActions[1]),
        ]).toEqual([
            {
                type: 'SEND_OPTIMISTIC_MESSAGE',
                payload: {
                    authorId: messageInfo.authorId,
                    userName: messageInfo.userName,
                    avatarUrl: messageInfo.avatarUrl,
                    messageText: messageInfo.messageText,
                    isOptimistic: true,
                },
            },
            {
                type: `${ACTION_PREFIX}SEND_MESSAGE_TO_SERVER`,
                payload: {
                    authorId: messageInfo.authorId,
                    userName: messageInfo.userName,
                    avatarUrl: messageInfo.avatarUrl,
                    messageText: messageInfo.messageText,
                },
            },
        ]);
    });
});
