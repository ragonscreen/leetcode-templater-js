const TO_BE_ONE_OF = [
        'find-peak-element',
        'sort-characters-by-frequency',
        'custom-sort-string',
        'find-unique-binary-string',
];

const TO_CONTAIN_ALL_VALUES = [
        'two-sum',
        'letter-combinations-of-a-phone-number',
        'remove-duplicates-from-sorted-array',
        'top-k-frequent-elements',
        'the-two-sneaky-numbers-of-digitville',
];

const TO_BE_CLOSE_TO = ['median-of-two-sorted-arrays', 'average-waiting-time'];

const adjustCustomMatchers = (problemData, testStr) => {
        const { titleSlug } = problemData;

        if (TO_BE_ONE_OF.includes(titleSlug)) {
                return testStr.replace('toStrictEqual', 'toBeOneOf');
        }

        if (TO_CONTAIN_ALL_VALUES.includes(titleSlug)) {
                return testStr.replace('toStrictEqual', 'toContainAllValues');
        }

        if (TO_BE_CLOSE_TO.includes(titleSlug)) {
                return testStr.replace('toStrictEqual', 'toBeCloseTo');
        }

        return testStr;
};

export { adjustCustomMatchers };
