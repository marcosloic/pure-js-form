// @ts-nocheck
import { ListViewModel } from '../state/listViewModel';

describe('The ListViewModel', () => {
    let stateObject;
    let fakeRootNode;
    let fakeDOMElement;

    beforeEach(() => {
        fakeRootNode = {
            appendChild: jest.fn(),
            removeChild: jest.fn(),
        };
        fakeDOMElement = {
            children: [
                {},
                {
                    removeEventListener: jest.fn(),
                },
            ],
            removeEventListener: jest.fn(),
        };
        stateObject = new ListViewModel(fakeRootNode);
    });
    afterEach(() => {
        stateObject = null;
        fakeRootNode = null;
        fakeDOMElement = null;
    });

    describe('When instantiated with a root DOM element', () => {
        describe('And the add method is called with a string', () => {
            test('It appends the string to the root DOM element', () => {
                stateObject.add('test');
                expect(fakeRootNode.appendChild).toHaveBeenCalledTimes(1);
            });
            test('The string is coverted into an HTMLElement', () => {
                stateObject.add('test');
                const calledWith = fakeRootNode.appendChild.mock.calls[0][0];
                expect(calledWith instanceof HTMLElement).toBe(true);
            });
            test('The new HTMLElement contains two children', () => {
                stateObject.add('test');
                const calledWith = fakeRootNode.appendChild.mock.calls[0][0];
                expect(calledWith.children.length).toBe(2);
            });
        });

        describe('And the remove method is called with a HTMLElement', () => {
            test('It tries to remove the element from the root DOM element', () => {
                stateObject.remove(fakeDOMElement);
                expect(fakeRootNode.removeChild).toHaveBeenCalledWith(
                    fakeDOMElement
                );
            });
            test('It removes the listeners from the element', () => {
                stateObject.remove(fakeDOMElement);
                expect(fakeDOMElement.removeEventListener).toHaveBeenCalled();
                expect(
                    fakeDOMElement.children[1].removeEventListener
                ).toHaveBeenCalled();
            });
        });

        describe('And the "delete" button is called', () => {
            test('It removes the element from the root DOM element', () => {
                stateObject.add('test');
                const addedDomElement =
                    fakeRootNode.appendChild.mock.calls[0][0];
                const closeButton = addedDomElement.children[1];

                closeButton.click();

                expect(fakeRootNode.removeChild).toHaveBeenCalledWith(
                    addedDomElement
                );
            });
        });

        describe('And the getValidEmailCount method is called', () => {
            test('It returns the number of valid email addresses that have been added', () => {
                stateObject.add('wrong');
                expect(stateObject.getValidEmailCount()).toBe(0);

                stateObject.add('wrong');
                expect(stateObject.getValidEmailCount()).toBe(0);

                stateObject.add('test@gmail.com');
                expect(stateObject.getValidEmailCount()).toBe(1);

                stateObject.add('another-test@gmail.com');
                expect(stateObject.getValidEmailCount()).toBe(2);
            });
        });
    });
});
