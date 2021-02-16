import { isValidEmail, onlyContainsCommas } from '../utils/emailUtils';

describe('The emailUtils', () => {
    describe('The onlyContainsCommas function', () => {
        test('It returns true when called with a string that only contains commas', () => {
            expect(onlyContainsCommas(',,,,,,,')).toBe(true);
            expect(onlyContainsCommas(',')).toBe(true);
        });

        test('It returns false when called with a string that DOES NOT only contains commas', () => {
            expect(onlyContainsCommas(',2134')).toBe(false);
            expect(onlyContainsCommas(',,,,,,,,,4')).toBe(false);
        });
    });

    describe('The isValidEmail function', () => {
        test('Returns true when the email is valid', () => {
            const validList = [
                'test@gmail.com',
                'test@test',
                'disposable.style.email.with+symbol@example.com',
                'other.email-with-hyphen@example.com',
                '"john..doe"@example.org',
                'user%example.com@example.org',
            ];
            validList.map((email) => {
                expect(isValidEmail(email)).toBe(true);
            });
        });
        test('Returns false when the email is NOT valid', () => {
            const invalidList = [
                'Abc.example.com',
                'A@b@c@example.com',
                'a"b(c)d,e:f;g<h>i[j\\k]l@example.com',
                'just"not"right@example.com',
                'this is"not\\allowed@example.com',
                'i_like_underscore@but_its_not_allowed_in_this_part.example.com',
            ];
            invalidList.map((email) => {
                expect(isValidEmail(email)).toBe(false);
            });
        });
    });
});
