import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Paper from 'material-ui/Paper';

import CreateMessageContainer from '../../containers/create-message-container';
import MessageListContainer from '../../containers/message-list-container';
import { requestNotificationPermission } from '../../tools/notification-tool';

import './chat-room.scss';

export default class ChatRoom extends React.PureComponent {
    static propTypes = {
        initUser: PropTypes.func.isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    componentDidMount() {
        requestNotificationPermission();
        this.props.initUser();
    }

    render() {
        const { classNames } = this.props;

        const chatRoomClassNames = classnames('chat-room', classNames);

        return (
            <div className={chatRoomClassNames}>
                <Paper className="chat-room__messages" zDepth={1}>
                    <MessageListContainer />
                </Paper>

                <div className="chat-room__message-form">
                    <CreateMessageContainer />
                </div>
            </div>
        );
    }
}
