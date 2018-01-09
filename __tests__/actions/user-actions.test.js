import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    changeUserName,
    setUserInfo,
    initUser,
    updateUserInfo,
} from '../../src/js/actions/user-actions';
import UserManager from '../../src/js/managers/user-manager';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User actions', () => {
    const userInfo = {
        userId: '0',
        userName: 'test',
        avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
    };

    it('should create an action to change user name', () => {
        expect(changeUserName(userInfo.userName)).toEqual({
            type: 'CHANGE_USER_NAME',
            payload: {
                userName: userInfo.userName,
            },
        });
    });

    it('should create an action to set user info', () => {
        expect(setUserInfo(userInfo.userId, userInfo.userName, userInfo.avatarUrl)).toEqual({
            type: 'SET_USER_INFO',
            payload: userInfo,
        });
    });

    it('creates SET_USER_INFO if user info store in local storage', () => {
        localStorage.clear();

        const store = mockStore();
        store.dispatch(initUser());

        expect(store.getActions()).toEqual([]);

        UserManager.setUser(userInfo);

        store.dispatch(initUser());

        expect(store.getActions()).toEqual([
            {
                type: 'SET_USER_INFO',
                payload: userInfo,
            },
        ]);
    });

    it('creates SET_USER_INFO when update user name', () => {
        localStorage.clear();

        const store = mockStore();
        store.dispatch(updateUserInfo('testUser'));

        expect(store.getActions().map(x => x.payload.userName)).toEqual(['testUser']);

        store.clearActions();
        store.dispatch(updateUserInfo('testUser'));

        expect(store.getActions()).toEqual([]);

        store.clearActions();

        UserManager.setUser(userInfo);

        store.dispatch(updateUserInfo('testUser'));

        expect(store.getActions().map(x => x.payload.userName)).toEqual(['testUser']);
    });
});
