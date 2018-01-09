import { createAction } from 'redux-actions';

import UserManager from '../managers/user-manager';
import { getGuid } from '../tools/guid-tool';
import { getAvatar } from '../tools/avatar-tool';

export const changeUserName = createAction('CHANGE_USER_NAME', userName => ({
    userName,
}));

export const setUserInfo = createAction('SET_USER_INFO', (userId, userName, avatarUrl) => ({
    userId,
    avatarUrl,
    userName,
}));

export const initUser = () => (dispatch) => {
    const userInfo = UserManager.getUser();

    if (userInfo) {
        dispatch(setUserInfo(userInfo.userId, userInfo.userName, userInfo.avatarUrl));
    }
};

export const updateUserInfo = userName => (dispatch) => {
    const userInfo = UserManager.getUser();

    if (!userInfo || userInfo.userName !== userName) {
        const userId = getGuid();
        const avatarUrl = getAvatar();

        UserManager.setUser({
            userId,
            userName,
            avatarUrl,
        });

        dispatch(setUserInfo(userId, userName, avatarUrl));
    }
};
