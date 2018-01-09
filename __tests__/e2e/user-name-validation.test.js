const expect = require('jest-matchers');

describe('user name validation', () => {
    let userNameInput;

    beforeEach(() => {
        browser.url('./');

        userNameInput = $('.create-message-form__user-name-input input');
    });

    it('should be invalid user name', () => {
        const warningMsg = 'Invalid user name';

        userNameInput.setValue('  qwertyui  ');
        browser.click('.create-message-form__text-message-input');

        expect($('.create-message-form__user-name-input div:last-child').getText()).toBe(warningMsg);

        userNameInput.setValue('    ');
        browser.click('.create-message-form__text-message-input');
        expect($('.create-message-form__user-name-input div:last-child').getText()).toBe(warningMsg);

        userNameInput.setValue('qwertyuiopasdfghjklzxcvbnmqwertyui');
        browser.click('.create-message-form__text-message-input');
        expect($('.create-message-form__user-name-input div:last-child').getText()).toBe(warningMsg);
    });

    it('should be user name is required', () => {
        const warningMsg = 'User name is required';

        userNameInput.setValue('');
        browser.click('.create-message-form__text-message-input');
        expect($('.create-message-form__user-name-input div:last-child').getText()).toBe(warningMsg);
    });
});
