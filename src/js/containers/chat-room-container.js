import { connect } from 'react-redux';

import ChatRoom from '../components/chat-room/chat-room';

import { initUser } from '../actions/user-actions';

export default connect(
    () => ({}),
    dispatch => ({
        initUser: () => dispatch(initUser()),
    }),
)(ChatRoom);
