import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ChatMessage from '../../components/chat-message/chat-message';

import CustomPropTypesTool from '../../tools/custom-prop-types-tool';

import MessageRecord from '../../records/message-record';

import './message-list.scss';

export default class MessageList extends React.PureComponent {
    static propTypes = {
        currentUserId: PropTypes.string.isRequired,
        messages: CustomPropTypesTool.immutableMapOf(PropTypes.instanceOf(MessageRecord))
            .isRequired,

        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    render() {
        const { messages, currentUserId, classNames } = this.props;

        const messageListClassNames = classnames('message-list', classNames);

        return (
            <div className={messageListClassNames}>
                <div className="message-list__list-container">
                    {messages
                        .map((message, messageId) => (
                            <div className="message-list__message-container" key={messageId}>
                                <ChatMessage
                                    userName={message.get('userName')}
                                    avatarUrl={message.get('avatarUrl')}
                                    messageText={message.get('messageText')}
                                    isOwnMessage={message.get('authorId') === currentUserId}
                                    isOptimistic={message.get('isOptimistic')}
                                    date={message.get('date')}
                                />
                            </div>
                        ))
                        .toArray()}
                </div>
            </div>
        );
    }
}
