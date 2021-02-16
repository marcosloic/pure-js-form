import { ListViewModel } from '../state/listViewModel';
import { KEYBOARD_EVENTS, KEYCODE, PASTE_EVENT } from '../constants';
import { onlyContainsCommas } from './emailUtils';

export const handleEmailKeyboardEvents = (
    evt: KeyboardEvent | ClipboardEvent | FocusEvent,
    emailInput: HTMLInputElement,
    listState: ListViewModel
): void => {
    const { type } = evt;
    const { value } = emailInput;

    const isBlurTrigger = type === KEYBOARD_EVENTS.blur;
    const isEnterTrigger =
        type === KEYBOARD_EVENTS.keyup &&
        (evt as KeyboardEvent).key === KEYCODE.enter;
    const isCommaTrigger =
        type === KEYBOARD_EVENTS.keyup &&
        (evt as KeyboardEvent).key === KEYCODE.comma;
    const isPasteTrigger = type === PASTE_EVENT;

    if (
        !isBlurTrigger &&
        !isEnterTrigger &&
        !isCommaTrigger &&
        !isPasteTrigger
    ) {
        return;
    }

    if (isEnterTrigger && value.length === 0) {
        return;
    }

    if (isBlurTrigger && value.length === 0) {
        return;
    }

    if (isCommaTrigger && onlyContainsCommas(value)) {
        return;
    }

    if (isPasteTrigger) {
        const pasteContent = (evt as ClipboardEvent).clipboardData.getData(
            'Text'
        );
        if (!pasteContent || pasteContent.length === 0) {
            return;
        }
        pasteContent
            .trim()
            .split(', ')
            .map((val) => listState.add(val));
    } else if (isCommaTrigger) {
        listState.add(value.substring(0, value.length - 1));
    } else {
        listState.add(value);
    }

    emailInput.value = '';
};
