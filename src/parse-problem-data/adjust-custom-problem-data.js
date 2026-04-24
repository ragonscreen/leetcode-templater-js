// Due to the "Explanation" title of the first testcase not being wrapped inside
// <strong> tags, the explanation is being parsed inside the output
const swimInRisingWater = (problemData) => {
        problemData.metadata.outputs[0] = 3;
};

// The two examples and the two testcases are in the opposite order.
const countAndSay = (problemData) => {
        problemData.metadata.outputs.reverse();
};

// The second example and the second testcase are different from each other.
const convertAnArrayIntoA2dArrayWithConditions = (problemData) => {
        problemData.metadata.outputs[1] = [[1, 2], [1]];
        problemData.metadata.inputs.push([[1, 2, 3, 4]]);
        problemData.metadata.outputs.push([[4, 3, 2, 1]]);
};

const adjustCustomProblemData = (problemData) => {
        switch (problemData.titleSlug) {
                case 'swim-in-rising-water':
                        swimInRisingWater(problemData);
                        break;

                case 'count-and-say':
                        countAndSay(problemData);
                        break;

                case 'convert-an-array-into-a-2d-array-with-conditions':
                        convertAnArrayIntoA2dArrayWithConditions(problemData);
                        break;

                default:
                        break;
        }
};

export { adjustCustomProblemData };
