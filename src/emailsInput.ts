import { createHtmlElement, AddToDom } from './utils/htmlManipulationUtils';

import { ListViewModel } from './state/listViewModel';
import { KEYBOARD_EVENTS, PASTE_EVENT } from './constants';
import { handleEmailKeyboardEvents } from './utils/handleEmailKeyboardEvents';
import { generateFakeEmail } from './utils/emailUtils';

// @ts-ignore
import styles from './emailsInput.css';

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

export const EmailsInput = (entryPoint: HTMLElement) => {
    /*
     * First render the form to the element passed by the user
     * and give the form a generated ID
     */
    const uniqueId = Math.random().toString();
    const htmlElem = createHtmlElement(htmlElement);
    htmlElem.id = uniqueId;
    AddToDom(entryPoint, htmlElem);

    // Use the unique ID to get the form,
    // so multiple forms can be added to the DOM
    const mainForm = document.getElementById(uniqueId);

    // Keep references of the main elements we want to interact with.
    const emailList = mainForm.getElementsByClassName(styles.emailList)[0];
    const addEmailButton = mainForm.getElementsByClassName(styles.addButton)[0];
    const countButton = mainForm.getElementsByClassName(styles.countButton)[0];
    const newEmailInput = mainForm.getElementsByClassName(
        styles.newAddressInput
    )[0] as HTMLInputElement;

    // Create the list viewModel
    const listViewModel = new ListViewModel(emailList);

    // Add the eventListeners to the DOM elements we are interested in
    addEmailButton.addEventListener(KEYBOARD_EVENTS.click, () =>
        listViewModel.add(generateFakeEmail())
    );
    countButton.addEventListener(KEYBOARD_EVENTS.click, () =>
        alert(`There are ${listViewModel.getValidEmailCount()} valid emails`)
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
