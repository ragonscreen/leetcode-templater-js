// Due to the "Explanation" title of the first testcase not being wrapped inside
// <strong> tags, the explanation is being parsed inside the output
const adjSwimInRisingWater = (problemData) => {
        problemData.metadata.outputs[0] = 3;
};

// The two examples and the two testcases are in the opposite order.
const adjCountAndSay = (problemData) => {
        problemData.metadata.outputs.reverse();
};

// The second example and the second testcase are different from each other.
const adjConvertAnArrayIntoA2dArrayWithConditions = (problemData) => {
        problemData.metadata.outputs[1] = [[1, 2], [1]];
        problemData.metadata.inputs.push([[1, 2, 3, 4]]);
        problemData.metadata.outputs.push([[4, 3, 2, 1]]);
};

// 26 and 27 are just plain weird

const adjRemoveDuplicatesFromSortedArray = (problemData) => {
        problemData.metadata.outputs = [
                { len: 2, nums: [1, 2] },
                { len: 5, nums: [0, 1, 2, 3, 4] },
        ];
};

const adjRemoveElement = (problemData) => {
        problemData.metadata.outputs = [
                { len: 2, nums: [2, 2] },
                { len: 5, nums: [0, 1, 3, 0, 4] },
        ];
};

// Expected values are implementation based for these problems
const adjRemoveOutputs = (problemData) => {
        problemData.metadata.outputs = [];
};

// `toStrictEqual` is invalid for these problems,
// and they require `toBeOneOf`
const adjTestMatcherToBeOneOf = (problemData) => {
        const customOutputs = {
                'find-peak-element': [[2], [1, 5]],
                'sort-characters-by-frequency': [
                        ['eert', 'eetr'],
                        ['aaaccc', 'cccaaa'],
                        ['bbAa', 'bbaA'],
                ],
                'custom-sort-string': [
                        ['cbad', 'cbda', 'cdba', 'dcba'],
                        ['bcad', 'bcda', 'bdca', 'dbca'],
                ],
                'find-unique-binary-string': [
                        ['00', '11'],
                        ['10', '11'],
                        ['000', '010', '100', '101', '110'],
                ],
        };

        const customOutput = customOutputs[problemData.titleSlug];

        if (customOutput) {
                problemData.metadata.outputs = customOutput;
        }
};

const adjDefault = (problemData) => {
        adjTestMatcherToBeOneOf(problemData);
};

const adjustCustomProblemData = (problemData) => {
        const customDatas = {
                'swim-in-rising-water': adjSwimInRisingWater,
                'count-and-say': adjCountAndSay,
                'convert-an-array-into-a-2d-array-with-conditions':
                        adjConvertAnArrayIntoA2dArrayWithConditions,
                'remove-element': adjRemoveElement,
                'remove-duplicates-from-sorted-array':
                        adjRemoveDuplicatesFromSortedArray,
                'generate-a-string-with-characters-that-have-odd-counts':
                        adjRemoveOutputs,
                'minimum-remove-to-make-valid-parentheses': adjRemoveOutputs,
                'array-with-elements-not-equal-to-average-of-neighbors':
                        adjRemoveOutputs,
                'find-missing-observations': adjRemoveOutputs,
        };

        const customData = customDatas[problemData.titleSlug];

        if (customData) {
                customData(problemData);
        } else {
                adjDefault(problemData);
        }
};

export { adjustCustomProblemData };
