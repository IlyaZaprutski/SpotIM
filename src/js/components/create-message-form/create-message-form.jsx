import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import './create-message-form.scss';

const ENTER_KEY_CODE = 13;
const USER_NAME_REG_EXP = /^[-\w\.\$@\*\!]{1,30}$/;

export default class CreateMessageForm extends React.PureComponent {
    static propTypes = {
        userName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        onChangeUserName: PropTypes.func.isRequired,
        onSendMessage: PropTypes.func.isRequired,
        onUpdateUserInfo: PropTypes.func.isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    state = {
        userNameWarningMsg: '',
        messageText: '',
    };

    onChangeUserName = (event, userName) => {
        this.props.onChangeUserName(userName);
    };

    onBlurUserNameInput = (event) => {
        const userName = event.target.value;

        if (!userName) {
            this.setState({
                userNameWarningMsg: 'User name is required',
            });

            return;
        }

        if (!USER_NAME_REG_EXP.test(userName)) {
            this.setState({
                userNameWarningMsg: 'Invalid user name',
            });

            return;
        }

        this.props.onUpdateUserInfo(userName);

        this.setState({
            userNameWarningMsg: '',
        });
    };

    onChangeMessageText = (event, messageText) => {
        this.setState({
            messageText,
        });
    };

    onSendMessage = () => {
        this.props.onSendMessage(this.state.messageText);

        this.setState({
            messageText: '',
        });
    };

    onKeyDownMessageText = (event) => {
        if (
            event.keyCode === ENTER_KEY_CODE &&
            this.props.userName &&
            this.state.messageText.trim() &&
            !event.shiftKey
        ) {
            event.preventDefault();
            this.onSendMessage();
        }
    };

    render() {
        const { userName, avatarUrl, classNames } = this.props;
        const { userNameWarningMsg, messageText } = this.state;

        const createMessageClassNames = classnames('create-message-form', classNames);
        const isSendBtnDisabled = !(userName && messageText.trim());

        return (
            <div className={createMessageClassNames}>
                <Paper className="create-message-form__paper-container" zDepth={1}>
                    <div className="create-message-form__user-info">
                        <Avatar
                            className="create-message-form__user-avatar"
                            src={avatarUrl}
                            size={50}
                        />

                        <TextField
                            className="create-message-form__user-name-input"
                            errorText={userNameWarningMsg}
                            hintText="User name"
                            onChange={this.onChangeUserName}
                            onBlur={this.onBlurUserNameInput}
                            fullWidth
                            value={userName}
                        />
                    </div>
                    <TextField
                        className="create-message-form__text-message-input"
                        hintText="Type message"
                        multiLine
                        rows={1}
                        rowsMax={4}
                        fullWidth
                        onChange={this.onChangeMessageText}
                        value={messageText}
                        onKeyDown={this.onKeyDownMessageText}
                    />

                    <div className="create-message-form__send-btn-container">
                        <FloatingActionButton
                            className="create-message-form__send-btn"
                            disabled={isSendBtnDisabled}
                            onClick={this.onSendMessage}
                        >
                            <SendIcon />
                        </FloatingActionButton>
                    </div>
                </Paper>
            </div>
        );
    }
}
