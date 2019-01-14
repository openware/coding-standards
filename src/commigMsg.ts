import * as R from 'ramda';

const RE_ENDS_WITH_NON_ALPHA = /[A-Za-z0-9]+$/;
export const MIN_LENGTH = 20;
export const MIN_WORD = 3;

interface Either<Left, Right> {
    left?: Left;
    right?: Right;
}

type Result = Either<string, string>;

type Rule = (msg: string) => boolean;

const lift = (rule: Rule, error: string) => ({ left, right }: Result) =>
    right ? { right } : left && rule(left) ? { left } : { right: error };

// tests
const startsWithJiraId: Rule = msg => msg.startsWith('Feature:') || msg.startsWith('Fix:');

const notEndsWithNonAlpha: Rule = msg => RE_ENDS_WITH_NON_ALPHA.test(msg);

const notFirstWordInPast: Rule = R.compose(
    s => !s.endsWith('ed'),
    R.head,
    R.drop(1),
    R.split(' '),
);

const hasEnoughWords: Rule = R.compose(
    x => x.length >= MIN_WORD,
    R.drop(1),
    R.split(' '),
);

const isLongEnough: Rule = msg => msg.length > MIN_LENGTH;

export const ERR_NO_JIRA = 'Message must start with "Feature" or "Fix"';
export const ERR_INVALID_PUNCTUATION = 'Message must not end with punctuation';
export const ERR_PAST_TENSE = 'Message seems to be in the past tense';
export const ERR_NOT_ENOUGH_WORDS = 'Message must have more than two words';
export const ERR_TOO_SHORT = `Message is too short (min: ${MIN_LENGTH})`;

const tests = [
    [startsWithJiraId, ERR_NO_JIRA],
    [notEndsWithNonAlpha, ERR_INVALID_PUNCTUATION],
    [notFirstWordInPast, ERR_PAST_TENSE],
    [hasEnoughWords, ERR_NOT_ENOUGH_WORDS],
    [isLongEnough, ERR_TOO_SHORT],
].map(pair => lift.apply(null, pair));

const isCommitMsgValid = (msg: string) =>
    R.compose.apply(null, tests)({ left: msg });

export {
    isCommitMsgValid,
};
