import userReducer from '../../../src/js/reducers/user-reducer';
import UserReducerRecord from '../../../src/js/records/user-reducer-record';

describe('User reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(new UserReducerRecord({
            userId: '',
            userName: '',
            avatarUrl: '',
        }));
    });

    it('should react to an action changeUserName', () => {
        const info = {
            userId: '',
            userName: 'test',
            avatarUrl: '',
        };

        expect(userReducer(undefined, {
            type: 'CHANGE_USER_NAME',
            payload: { userName: info.userName },
        })).toEqual(new UserReducerRecord(info));
    });

    it('should react to an action setUserInfo', () => {
        const info = {
            userId: '0',
            avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
            userName: 'test',
        };

        expect(userReducer(undefined, {
            type: 'SET_USER_INFO',
            payload: info,
        })).toEqual(new UserReducerRecord(info));
    });
});
