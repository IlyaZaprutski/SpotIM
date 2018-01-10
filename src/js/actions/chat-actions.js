import { createAction } from 'redux-actions';

import { ACTION_PREFIX } from '../constants/spotim-socket-constants';
import { getGuid } from '../tools/guid-tool';
import { sendNotification } from '../tools/notification-tool';

export const sendMessageToServer = createAction(
    `${ACTION_PREFIX}SEND_MESSAGE_TO_SERVER`,
    (id, userId, userName, avatarUrl, messageText, date) => ({
        id,
        authorId: userId,
        username: userName,
        avatar: avatarUrl,
        text: messageText,
        date,
    }),
);

export const sendOptimisticMessage = createAction(
    'SEND_OPTIMISTIC_MESSAGE',
    (id, userId, userName, avatarUrl, messageText, date) => ({
        id,
        authorId: userId,
        userName,
        avatarUrl,
        messageText,
        date,
        isOptimistic: true,
    }),
);

export const receiveMessage = createAction(
    'RECEIVE_MESSAGE',
    ({
        id, authorId, username, avatar, text, date,
    }) => {
        sendNotification(username, text, avatar);

        return {
            id,
            authorId,
            userName: username,
            avatarUrl: avatar,
            messageText: text,
            date,
            isOptimistic: false,
        };
    },
);

export const sendMessage = text => (dispatch, getState) => {
    const { userId, userName, avatarUrl } = getState().userInfo;
    const messageId = getGuid();
    const messageDate = Date.now();

    // testing optimistic UI
    // setTimeout(
    //     () =>
    //         dispatch(sendMessageToServer(messageId, userId, userName, avatarUrl, text, messageDate)),
    //     5000,
    // );

    dispatch(sendOptimisticMessage(messageId, userId, userName, avatarUrl, text, messageDate));
    dispatch(sendMessageToServer(messageId, userId, userName, avatarUrl, text, messageDate));
};
