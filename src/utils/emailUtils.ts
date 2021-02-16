import { KEYCODE } from '../constants';
import { createHtmlElement } from './htmlManipulationUtils';

export const onlyContainsCommas = (value: string): boolean => {
    return (
        value
            .split('')
            .filter((character: string) => character !== KEYCODE.comma)
            .length === 0
    );
};

export const generateFakeEmail = () => {
    const strValues = 'abcdefg12345';
    let strEmail = '';
    let strTmp;
    for (let i = 0; i < 7; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = '';
    strEmail = strEmail + '@';
    for (let j = 0; j < 8; j++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + '.com';
    return strEmail;
};

/*
 * This uses the native email input to check the email validity.
 * The RFC for what constitutes a valid email address is quite comprehensive
 *
 * Another solution would be to copy a regex and pray
 * or install a dependency where someone copied a regex (And pray)
 * (For reference, the regex for the old RFC822 email spec can be found here: http://www.ex-parrot.com/~pdw/Mail-RFC822-Address.html)
 *
 * In a real project, I'd discuss the use case. Is it purely cosmetic? Does the backend send an invite to every address anyway?
 * If so, the implementation could be just "good enough in most cases"
 */
export const isValidEmail = (emailValue: string): boolean => {
    return createHtmlElement(
        `<input type="email" value="${emailValue}" />`
    ).checkValidity();
};
