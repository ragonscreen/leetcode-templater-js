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

// Missing "Explanation" title in the third testcase causes it to be parsed
// inside the output.
const adjFindTheSmallestBalancedIndex = (problemData) => {
        problemData.metadata.outputs[2] = -1;
};

// 26 and 27 are just plain weird
// 26
const adjRemoveDuplicatesFromSortedArray = (problemData) => {
        problemData.metadata.outputs = [
                { len: 2, nums: [1, 2] },
                { len: 5, nums: [0, 1, 2, 3, 4] },
        ];
};

// 27
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

// Premium problems
const adjTestMatcherPremium = (problemData) => {
        const customOutputs = {
                'longest-substring-with-at-most-two-distinct-characters': [
                        3, 5,
                ],
                'longest-substring-with-at-most-k-distinct-characters': [3, 2],
                'sort-transformed-array': [
                        [3, 9, 15, 33],
                        [-23, -5, 1, 7],
                ],
                'max-consecutive-ones-ii': [4, 4],
                'find-k-length-substrings-with-no-repeated-characters': [6, 0],
                'minimum-swaps-to-group-all-1s-together': [1, 0, 3],
                'group-shifted-strings': [
                        [
                                ['acef'],
                                ['az', 'ba'],
                                ['abc', 'bcd', 'xyz'],
                                ['a', 'z'],
                        ],
                        [['a']],
                ],
        };

        const customOutput = customOutputs[problemData.titleSlug];

        if (customOutput) {
                problemData.metadata.outputs = customOutput;
        }
};

const adjDefault = (problemData) => {
        adjTestMatcherToBeOneOf(problemData);
        adjTestMatcherPremium(problemData);
};

const adjustCustomProblemData = (problemData) => {
        const customDatas = {
                'swim-in-rising-water': adjSwimInRisingWater,
                'count-and-say': adjCountAndSay,
                'convert-an-array-into-a-2d-array-with-conditions':
                        adjConvertAnArrayIntoA2dArrayWithConditions,
                'find-the-smallest-balanced-index':
                        adjFindTheSmallestBalancedIndex,
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
