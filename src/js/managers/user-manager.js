class UserManager {
    getUser() {
        const userInfo = localStorage.getItem('userInfo');

        return userInfo && JSON.parse(userInfo);
    }

    setUser(userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
}

export default new UserManager();
