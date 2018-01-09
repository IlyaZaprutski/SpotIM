import { connect } from 'react-redux';

import CreateMessageForm from '../components/create-message-form/create-message-form';

import { changeUserName, updateUserInfo } from '../actions/user-actions';
import { sendMessage } from '../actions/chat-actions';

export default connect(
    state => ({
        userId: state.userInfo.get('userId'),
        userName: state.userInfo.get('userName'),
        avatarUrl: state.userInfo.get('avatarUrl'),
    }),
    dispatch => ({
        onChangeUserName: userName => dispatch(changeUserName(userName)),
        onSendMessage: text => dispatch(sendMessage(text)),
        onUpdateUserInfo: userName => dispatch(updateUserInfo(userName)),
    }),
)(CreateMessageForm);
