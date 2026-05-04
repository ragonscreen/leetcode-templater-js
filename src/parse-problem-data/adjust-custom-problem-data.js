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
        switch (problemData.titleSlug) {
                case 'swim-in-rising-water':
                        adjSwimInRisingWater(problemData);
                        break;

                case 'count-and-say':
                        adjCountAndSay(problemData);
                        break;

                case 'convert-an-array-into-a-2d-array-with-conditions':
                        adjConvertAnArrayIntoA2dArrayWithConditions(
                                problemData,
                        );
                        break;

                default:
                        adjDefault(problemData);
                        break;
        }
};

export { adjustCustomProblemData };
