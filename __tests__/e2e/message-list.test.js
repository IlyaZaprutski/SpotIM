const expect = require('jest-matchers');

const getMessageInfo = (index) => {
    const messageContainer = $(`.message-list__list-container .message-list__message-container:nth-child(${index})`);

    return {
        messageTest: messageContainer.$('.chat-message__text').getText(),
        messageAuthor: messageContainer.$('.chat-message__user-name').getText(),
    };
};

const generateRandomMessage = () => {
    let result = '';

    for (let i = 0; i < 8; i += 1) {
        result += `${Math.random()
            .toString(36)
            .substring(2, 15)} `;
    }

    return result.trim();
};

describe('message-list', () => {
    let sendBtn;
    let userNameInput;
    let textMsgTextarea;

    beforeEach(() => {
        browser.url('./');

        userNameInput = $('.create-message-form__user-name-input input');
        textMsgTextarea = $('.create-message-form__text-message-input textarea:last-of-type');
        sendBtn = $('.create-message-form__send-btn');
    });

    it('should send single message', () => {
        const messageText = generateRandomMessage();
        const userName = 'testUser';

        userNameInput.setValue(userName);
        textMsgTextarea.setValue(messageText);

        sendBtn.click();

        const messageInfo = getMessageInfo(1);

        expect(messageInfo.messageTest).toBe(messageText);
        expect(messageInfo.messageAuthor).toBe(userName);
    });

    it('should send multiple messages', () => {
        const baseUserName = 'testUser';

        for (let i = 1; i < 10; i += 1) {
            const userName = baseUserName + i;
            const messageText = generateRandomMessage();

            userNameInput.setValue(userName);
            textMsgTextarea.setValue(messageText);

            sendBtn.click();

            const messageInfo = getMessageInfo(i);

            expect(messageInfo.messageTest).toBe(messageText);
            expect(messageInfo.messageAuthor).toBe(userName);
        }
    });
});
