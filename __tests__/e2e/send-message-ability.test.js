const expect = require('jest-matchers');

describe('send-message-ability', () => {
    let userNameInput;
    let textMsgTextarea;

    beforeEach(() => {
        browser.url('./');

        userNameInput = $('.create-message-form__user-name-input input');
        textMsgTextarea = $('.create-message-form__text-message-input textarea:last-of-type');
    });

    it('should not be able to send a message by user name', () => {
        userNameInput.setValue('  qwertyui  ');
        textMsgTextarea.setValue('test message');

        expect(browser.isEnabled('.create-message-form__send-btn button')).toBe(false);
    });

    it('should not be able to send a message by empty message', () => {
        userNameInput.setValue('testUser');
        textMsgTextarea.setValue('');

        expect(browser.isEnabled('.create-message-form__send-btn button')).toBe(false);
    });

    it('should  be able to send a message', () => {
        userNameInput.setValue('testUser');
        textMsgTextarea.setValue('test message');

        expect(browser.isEnabled('.create-message-form__send-btn button')).toBe(true);
    });
});
