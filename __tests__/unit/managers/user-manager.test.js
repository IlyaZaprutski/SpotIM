import UserManager from '../../../src/js/managers/user-manager';

describe('User manager', () => {
    const userInfo = {
        userId: '0',
        userName: 'test',
        avatarUrl: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
    };

    it('should set user info to localStorage', () => {
        UserManager.setUser(userInfo);

        expect(localStorage.getItem('userInfo')).toEqual(JSON.stringify(userInfo));
    });

    it('should restore user info from localStorage', () => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        expect(UserManager.getUser()).toEqual(userInfo);
    });
});
