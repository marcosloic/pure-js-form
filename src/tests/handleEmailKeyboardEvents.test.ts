// @ts-nocheck
import { handleEmailKeyboardEvents } from '../utils/handleEmailKeyboardEvents';
import { KEYBOARD_EVENTS, KEYCODE, PASTE_EVENT } from '../constants';

describe('The handleEmailKeyboardEvents function', () => {
    let stateObject;

    beforeEach(() => {
        stateObject = {
            add: jest.fn(),
        };
    });

    describe('When there is an ENTER event', () => {
        test('It will add the email if the field is not empty', () => {
            handleEmailKeyboardEvents(
                { type: KEYBOARD_EVENTS.keyup, key: KEYCODE.enter },
                { value: 'test' },
                stateObject
            );
            expect(stateObject.add).toHaveBeenCalledWith('test');
        });
        test('It will NOT add the email if the field is empty', () => {
            handleEmailKeyboardEvents(
                { type: KEYBOARD_EVENTS.keyup, key: KEYCODE.enter },
                { value: '' },
                stateObject
            );
            expect(stateObject.add).not.toHaveBeenCalled();
        });
    });

    describe('When there is a COMMA event', () => {
        test('It will add the email if the field is not empty', () => {
            handleEmailKeyboardEvents(
                { type: KEYBOARD_EVENTS.keyup, key: KEYCODE.comma },
                { value: 'test,' },
                stateObject
            );
            expect(stateObject.add).toHaveBeenCalledWith('test');
        });
        test('It will NOT add the email if the field is empty', () => {
            handleEmailKeyboardEvents(
                { type: KEYBOARD_EVENTS.keyup, key: KEYCODE.comma },
                { value: '' },
                stateObject
            );
            expect(stateObject.add).not.toHaveBeenCalled();
        });
        test('It will NOT add the email if the user only input the comma', () => {
            handleEmailKeyboardEvents(
                { type: KEYBOARD_EVENTS.keyup, key: KEYCODE.comma },
                { value: ',' },
                stateObject
            );
            expect(stateObject.add).not.toHaveBeenCalled();
        });
    });

    describe('When there is a BLUR event', () => {
        test('It will add the email if the field is not empty', () => {
            handleEmailKeyboardEvents(
                { type: KEYBOARD_EVENTS.blur },
                { value: 'test' },
                stateObject
            );
            expect(stateObject.add).toHaveBeenCalledWith('test');
        });
        test('It will NOT add the email if the field is empty', () => {
            handleEmailKeyboardEvents(
                { type: KEYBOARD_EVENTS.blur },
                { value: '' },
                stateObject
            );
            expect(stateObject.add).not.toHaveBeenCalled();
        });
    });

    describe('When there is a PASTE event', () => {
        test('It will add the email if the clipboard is not empty', () => {
            handleEmailKeyboardEvents(
                {
                    type: PASTE_EVENT,
                    clipboardData: {
                        getData: () => 'test',
                    },
                },
                {},
                stateObject
            );
            expect(stateObject.add).toHaveBeenCalledWith('test');
        });
        test('It will add a list of emails to the list if they are comma separated', () => {
            handleEmailKeyboardEvents(
                {
                    type: PASTE_EVENT,
                    clipboardData: {
                        getData: () => 'one, two, three, four',
                    },
                },
                {},
                stateObject
            );
            expect(stateObject.add).toHaveBeenCalledTimes(4);
            expect(stateObject.add).toHaveBeenNthCalledWith(1, 'one');
            expect(stateObject.add).toHaveBeenNthCalledWith(2, 'two');
            expect(stateObject.add).toHaveBeenNthCalledWith(3, 'three');
            expect(stateObject.add).toHaveBeenNthCalledWith(4, 'four');
        });
        test('It will NOT add the email if the clipboard is empty', () => {
            handleEmailKeyboardEvents(
                {
                    type: PASTE_EVENT,
                    clipboardData: {
                        getData: () => '',
                    },
                },
                {},
                stateObject
            );
            expect(stateObject.add).not.toHaveBeenCalled();
        });
        test('It will NOT add the email if the clipboard only contains commas', () => {
            handleEmailKeyboardEvents(
                {
                    type: PASTE_EVENT,
                    clipboardData: {
                        getData: () => ',,,,,',
                    },
                },
                {},
                stateObject
            );
            expect(stateObject.add).not.toHaveBeenCalled();
        });
        test('It will NOT add the email if the clipboard only contains commas', () => {
            handleEmailKeyboardEvents(
                {
                    type: PASTE_EVENT,
                    clipboardData: {
                        getData: () => 'test,test2,test3',
                    },
                },
                {},
                stateObject
            );
            expect(stateObject.add).toHaveBeenCalledTimes(3);
            expect(stateObject.add).toHaveBeenNthCalledWith(1, 'test');
            expect(stateObject.add).toHaveBeenNthCalledWith(2, 'test2');
            expect(stateObject.add).toHaveBeenNthCalledWith(3, 'test3');
        });
    });
});
