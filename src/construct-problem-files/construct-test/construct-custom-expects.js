import { gap } from '../../utils.js';

const constructExpectConvertAnArrayIntoA2dArrayWithConditions = (
        name,
        strParamNames,
) => {
        return `${gap(2)}const actual = ${name}(${strParamNames});

${gap(2)}for (let i = 0; i < expected.length; i++) {
${gap(3)}expect(actual[i]).toContainAllValues(expected[i]);
${gap(2)}}`;
};

const constructExpectGenerateAStringWithCharactersThatHaveOddCounts = (
        name,
        strParamNames,
) => {
        return `${gap(2)}const countMap = new Map();
${gap(2)}const actual = ${name}(${strParamNames});

${gap(2)}for (const char of actual) {
${gap(3)}countMap.set(char, (countMap.get(char) || 0) + 1);
${gap(2)}}

${gap(2)}expect(actual).toHaveLength(n);
${gap(2)}expect(countMap.values().every((e) => e % 2)).toStrictEqual(true);`;
};

const constructExpectMinimumRemoveToMakeValidParentheses = (
        name,
        strParamNames,
) => {
        return `${gap(2)}const actual = ${name}(${strParamNames});
${gap(2)}let countOpen = 0;
${gap(2)}let countClose = 0;
${gap(2)}let countCloseBeforeOpen = 0;

${gap(2)}for (const c of actual) {
${gap(3)}if (c === '(') {
${gap(4)}countOpen++;
${gap(3)}}

${gap(3)}if (c === ')') {
${gap(4)}countClose++;

${gap(4)}if (countOpen < countClose) {
${gap(5)}countCloseBeforeOpen++;
${gap(4)}}
${gap(3)}}
${gap(2)}}

${gap(2)}expect(countOpen).toStrictEqual(countClose);
${gap(2)}expect(countCloseBeforeOpen).toStrictEqual(0);`;
};

const constructExpectRotateImage = (name, strParamNames) => {
        return `${gap(2)}expect(${name}(${strParamNames})).toBeNil();

${gap(2)}for (let i = 0; i < ${strParamNames}.length; i++) {
${gap(3)}expect(${strParamNames}[i]).toStrictEqual(expected[i]);
${gap(2)}}`;
};

const constructExpectRemoveElement = (name, strParamNames) => {
        return `${gap(2)}const k = ${name}(${strParamNames});
${gap(2)}expect(k).toStrictEqual(expected.len);
${gap(2)}expect(nums.slice(0, k)).toStrictEqual(expected.nums);`;
};

const constructExpectRemoveDuplicatesFromSortedArray = (
        name,
        strParamNames,
) => {
        return `${gap(2)}const k = ${name}(${strParamNames});
${gap(2)}expect(k).toStrictEqual(expected.len);
${gap(2)}expect(nums.slice(0, k)).toContainAllValues(expected.nums);`;
};

const CUSTOM_EXPECTS = {
        'convert-an-array-into-a-2d-array-with-conditions':
                constructExpectConvertAnArrayIntoA2dArrayWithConditions,
        'generate-a-string-with-characters-that-have-odd-counts':
                constructExpectGenerateAStringWithCharactersThatHaveOddCounts,
        'minimum-remove-to-make-valid-parentheses':
                constructExpectMinimumRemoveToMakeValidParentheses,
        'rotate-image': constructExpectRotateImage,
        'remove-element': constructExpectRemoveElement,
        'remove-duplicates-from-sorted-array':
                constructExpectRemoveDuplicatesFromSortedArray,
};

const constructCustomExpect = (name, strParamNames, titleSlug) => {
        const customExpect = CUSTOM_EXPECTS[titleSlug];

        if (customExpect) {
                return `\n${customExpect(name, strParamNames)}\n${gap()}});\n});`;
        }

        return null;
};

export { constructCustomExpect };
