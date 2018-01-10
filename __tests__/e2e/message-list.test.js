const expect = require('jest-matchers');

const getMessageText = index =>
    $(`.message-list__list-container .message-list__message-container:nth-child(${index}) .chat-message__text`).getText();

const getAuthorName = index =>
    $(`.message-list__list-container .message-list__message-container:nth-child(${index}) .chat-message__user-name`).getText();

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

        expect(getMessageText(1)).toBe(messageText);
        expect(getAuthorName(1)).toBe(userName);
    });

    it('should send multiple messages', () => {
        const baseUserName = 'testUser';

        for (let i = 1; i < 10; i += 1) {
            const userName = baseUserName + i;
            const messageText = generateRandomMessage();

            userNameInput.setValue(userName);
            textMsgTextarea.setValue(messageText);

            sendBtn.click();

            expect(getMessageText(i)).toBe(messageText);
            expect(getAuthorName(i)).toBe(userName);
        }
    });
});
