import { connect } from 'react-redux';

import MessageList from '../components/message-list/message-list';

export default connect(state => ({
    messages: state.messages,
    currentUserId: state.userInfo.get('userId'),
}))(MessageList);
