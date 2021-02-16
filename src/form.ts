import { createHtmlElement, AddToDom } from './utils/htmlManipulationUtils';

import { ListViewModel } from './state/listViewModel';
import { KEYBOARD_EVENTS, PASTE_EVENT } from './constants';
import { handleEmailKeyboardEvents } from './utils/handleEmailKeyboardEvents';

// @ts-ignore
import styles from './form.css';

const htmlElement = `
<div class="${styles.form}">
    <div class="${styles.header}">
        <div class="${styles.headerContainer}">
            <h1>Share <b>board name</b> with others</h1>
            <div class="${styles.emailContainer}">
                <div class="${styles.emailList}">
                    <input type="text" class="${styles.genericEmailStyle} ${styles.newAddressInput}" placeholder="Add more people..." />
                </div>
            </div>
        </div>
    </div>
    <div class="${styles.footer}">
        <div class="${styles.buttonContainer}">
            <button class="${styles.addButton}">Add email</button>
            <button class="${styles.countButton}">Get email count</button>
        </div>
    </div>
</div>
`;

export const Form = (entryPoint: HTMLElement) => {
    const id = renderMain(entryPoint);

    // Setup anchor for dom manip
    const mainForm = document.getElementById(id);

    // Getters for dom elements
    const emailList = mainForm.getElementsByClassName(styles.emailList)[0];
    const addEmailButton = mainForm.getElementsByClassName(styles.addButton)[0];
    const countButton = mainForm.getElementsByClassName(styles.countButton)[0];
    const newEmailInput = mainForm.getElementsByClassName(
        styles.newAddressInput
    )[0] as HTMLInputElement;

    // Create list state object
    const listViewModel = new ListViewModel(emailList);

    addEmailButton.addEventListener(KEYBOARD_EVENTS.click, () =>
        listViewModel.add(Math.random().toString())
    );
    countButton.addEventListener(KEYBOARD_EVENTS.click, () =>
        alert(`There are ${listViewModel.getValidEmailCount()} emails`)
    );

    newEmailInput.addEventListener(
        KEYBOARD_EVENTS.keyup,
        (evt: KeyboardEvent) => {
            handleEmailKeyboardEvents(evt, newEmailInput, listViewModel);
        }
    );

    newEmailInput.addEventListener(KEYBOARD_EVENTS.blur, (evt: FocusEvent) => {
        handleEmailKeyboardEvents(evt, newEmailInput, listViewModel);
    });

    newEmailInput.addEventListener(PASTE_EVENT, (evt: ClipboardEvent) => {
        evt.preventDefault();
        handleEmailKeyboardEvents(evt, newEmailInput, listViewModel);
    });
};

const renderMain = (entryPoint: HTMLElement) => {
    const uniqueId = Math.random().toString();
    const htmlElem = createHtmlElement(htmlElement);
    htmlElem.id = uniqueId;
    AddToDom(entryPoint, htmlElem);
    return uniqueId;
};
