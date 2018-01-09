import { handleActions } from 'redux-actions';

import { changeUserName, setUserInfo } from '../actions/user-actions';

import UserReducerRecord from '../records/user-reducer-record';

export default handleActions(
    {
        [changeUserName]: (state, action) => state.set('userName', action.payload.userName),
        [setUserInfo]: (state, action) =>
            state
                .set('userId', action.payload.userId)
                .set('userName', action.payload.userName)
                .set('avatarUrl', action.payload.avatarUrl),
    },
    new UserReducerRecord({
        userId: '',
        userName: '',
        avatarUrl: '',
    }),
);
