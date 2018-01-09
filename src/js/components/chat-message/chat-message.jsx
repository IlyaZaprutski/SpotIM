import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Avatar from 'material-ui/Avatar';

import TimeAgo from '../../components/time-ago/time-ago';

import './chat-message.scss';

export default class ChatMessage extends React.PureComponent {
    static propTypes = {
        userName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        messageText: PropTypes.string.isRequired,
        isOwnMessage: PropTypes.bool.isRequired,
        date: PropTypes.number.isRequired,
        isOptimistic: PropTypes.bool,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        isOptimistic: false,
        classNames: '',
    };

    render() {
        const {
            userName,
            messageText,
            avatarUrl,
            isOwnMessage,
            isOptimistic,
            date,
            classNames,
        } = this.props;

        const chatMessageClassNames = classnames('chat-message', classNames, {
            'chat-message_own-message': isOwnMessage,
            'chat-message_extraneous-message': !isOwnMessage,
            'chat-message_optimistic': isOptimistic,
        });

        return (
            <div className={chatMessageClassNames}>
                <div className="chat-message__avatar-container">
                    <Avatar src={avatarUrl} className="chat-message__avatar" size={50} />
                </div>
                <div className="chat-message__message-info">
                    <div className="chat-message__header">
                        <span className="chat-message__user-name">{userName}</span>
                        <span className="chat-message__date">
                            {isOptimistic ? 'sending...' : <TimeAgo date={date} />}
                        </span>
                    </div>
                    <div className="chat-message__text">{messageText}</div>
                </div>
            </div>
        );
    }
}
