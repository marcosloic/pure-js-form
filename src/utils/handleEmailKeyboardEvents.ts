import { ListViewModel } from '../state/listViewModel';
import { KEYBOARD_EVENTS, KEYCODE, PASTE_EVENT } from '../constants';
import { onlyContainsCommas } from './emailUtils';

/*
 * Function that handles the user interactions with the list
 * It receives:
 *  - The event that triggered the interaction so we can determine the type
 *  - A reference to the "new email" input so we can get the new email value
 *  - A reference to the viewModel, so new emails can be added to the DOM
 */
export const handleEmailKeyboardEvents = (
    evt: KeyboardEvent | ClipboardEvent | FocusEvent,
    emailInput: HTMLInputElement,
    listState: ListViewModel
) => {
    const { type } = evt;

    const isBlurTrigger = type === KEYBOARD_EVENTS.blur;
    const isEnterTrigger =
        type === KEYBOARD_EVENTS.keyup &&
        (evt as KeyboardEvent).key === KEYCODE.enter;
    const isCommaTrigger =
        type === KEYBOARD_EVENTS.keyup &&
        (evt as KeyboardEvent).key === KEYCODE.comma;
    const isPasteTrigger = type === PASTE_EVENT;

    // Determine if we should try to add the new email. Is the event one of the triggers we're looking for?
    if (
        !isBlurTrigger &&
        !isEnterTrigger &&
        !isCommaTrigger &&
        !isPasteTrigger
    ) {
        return;
    }

    // The "paste" event is a bit different, as we have to retrieve the value of the clipboard
    // We also expect a list of emails rather than a single value
    if (isPasteTrigger) {
        const pasteContent =
            (evt as ClipboardEvent).clipboardData.getData('Text') ||
            ((window as any).clipboardData?.getData('Text') as string);

        if (!pasteContent || pasteContent.length === 0) {
            return;
        }
        if (onlyContainsCommas(pasteContent)) {
            return;
        }
        return pasteContent
            .trim()
            .split(',')
            .map((val) => val.trim())
            .map((val) => listState.add(val));
    }

    const { value } = emailInput;
    const valueIsEmpty = !value || value.length === 0;
    const valueContainsOnlyCommas = onlyContainsCommas(value);

    // Avoid the case where the user spams the comma key or the enter button
    if (valueIsEmpty || valueContainsOnlyCommas) {
        return;
    }

    if (isCommaTrigger) {
        listState.add(value.substring(0, value.length - 1));
    } else {
        listState.add(value);
    }

    // Reset the input once the value has been added
    emailInput.value = '';
};
