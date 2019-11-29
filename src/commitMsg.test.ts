import {
    ERR_INVALID_PUNCTUATION,
    ERR_NO_JIRA,
    ERR_NOT_ENOUGH_WORDS,
    ERR_PAST_TENSE,
    ERR_TOO_SHORT,
    isCommitMsgValid,
    MIN_LENGTH,
} from './commitMsg';

describe('#isCommitMsgValid', () => {
    it('should fail when message starts with ccc-ddd', () => {
        const msg = 'crypt-123 Some random message';
        const { right } = isCommitMsgValid(msg);
        expect(right).toEqual(ERR_NO_JIRA);
    });

    it('should fail when message ends with dot', () => {
        const msg = 'Feature Some random message.';
        const { right } = isCommitMsgValid(msg);
        expect(right).toEqual(ERR_INVALID_PUNCTUATION);
    });

    it('should fail when message ends with comma', () => {
        const msg = 'Feature: Some random message,';
        const { right } = isCommitMsgValid(msg);
        expect(right).toEqual(ERR_INVALID_PUNCTUATION);
    });

    it('should fail when message ends with space', () => {
        const msg = 'Feature: Some random message ';
        const { right } = isCommitMsgValid(msg);
        expect(right).toEqual(ERR_INVALID_PUNCTUATION);
    });

    it('should fail when message starts with verb in past tense', () => {
        const msg = 'Feature: Fixed a bug, fixed a bug, fixed a bug';
        const { right } = isCommitMsgValid(msg);
        expect(right).toEqual(ERR_PAST_TENSE);
    });

    it('should fail when message is shorter than tree words', () => {
        const msg = 'Feature: Remove something';
        const { right } = isCommitMsgValid(msg);
        expect(right).toEqual(ERR_NOT_ENOUGH_WORDS);
    });

    it(`should fail when message is shorter than ${MIN_LENGTH} chars`, () => {
        const msg = 'Feature: A b';
        const { right } = isCommitMsgValid(msg);
        expect(right).toEqual(ERR_TOO_SHORT);
    });

    it('should pass when message starts with NOJIRA', () => {
        const msg = 'Fix: Some valid message';
        const { right } = isCommitMsgValid(msg);
        expect(right).toBeFalsy();
    });
});
