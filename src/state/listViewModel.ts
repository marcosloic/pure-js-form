import {
    createHtmlElement,
    RemoveFromDom,
    AddToDom,
} from '../utils/htmlManipulationUtils';
// @ts-ignore
import styles from '../emailsInput.css';
import { isValidEmail } from '../utils/emailUtils';

/*
 * Interface between the DOM and the data
 * Must be instantiated with a reference to the element to manage
 */
export class ListViewModel {
    private listHtmlElem: Element;
    private itemCount = 0;

    constructor(list: Element) {
        this.listHtmlElem = list;
    }

    /*
     * Converts a string into an HTMLElement, with the correct styles
     * and attaches it to the DOM
     */
    public add(elem: string) {
        const isEmailValid = isValidEmail(elem);
        if (isEmailValid) {
            this.itemCount++;
        }

        const emailClass = isEmailValid ? styles.email : styles.emailInvalid;
        const newElem: HTMLInputElement = createHtmlElement(
            `
        <div class="${styles.genericEmailStyle} ${styles.validatedEmailContainer} ${emailClass}">
            <span class="${styles.validatedEmailName}">${elem}</span>
            <span class="${styles.validatedEmailButton}">x</span>
        </div>
        `
        );
        const deleteIcon = newElem.children[1];
        newElem.addEventListener('mousedown', (evt: Event) =>
            evt.preventDefault()
        );
        newElem.addEventListener('click', (evt: Event) => {
            if (evt.target === deleteIcon) {
                this.remove(newElem, isEmailValid);
            }
        });
        return AddToDom(this.listHtmlElem, newElem);
    }

    public remove(element: HTMLElement, isEmailValid: boolean) {
        if (isEmailValid) {
            this.itemCount--;
        }

        const deleteIcon = element.children[1];
        element.removeEventListener('click', null);
        deleteIcon.removeEventListener('mousedown', null);
        RemoveFromDom(this.listHtmlElem, element);
    }

    public getValidEmailCount(): number {
        return this.itemCount;
    }
}
