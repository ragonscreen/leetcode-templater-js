import { constructStrTestImports } from './construct-string_test-imports.js';
import { DEFAULTS } from './defaults.js';

const { INDENT_WIDTH } = DEFAULTS;
const GAP = `${' '.repeat(INDENT_WIDTH)}`;

const getTestcases = (problemData) => {
        const { metadata, inputs, outputs } = problemData;
        const testcases = [];

        for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                const testcase = new Map([['expected', outputs[i]]]);

                for (let j = 0; j < input.length; j++) {
                        const paramValue = input[j];
                        const paramName = metadata.params[j].name;
                        testcase.set(paramName, paramValue);
                }

                testcases.push(testcase);
        }

        return testcases;
};

const constructStrTestTestcases = (problemData) => {
        const testcases = getTestcases(problemData);
        let str = '\n\nconst testcases = [\n';

        for (const testcase of testcases) {
                str += `${GAP}{ `;

                for (const [key, val] of testcase) {
                        if (key === 'expected') {
                                continue;
                        }

                        str += `${key}: ${JSON.stringify(val)}, `;
                }

                str += `expected: ${JSON.stringify(testcase.get('expected'))} },\n`;
        }

        str += '];';

        return str;
};

const constructStrTestFuncDescribe = (problemData) => {
        const { metadata } = problemData;
        const { name, params } = metadata;
        const paramNames = params.map((e) => e.name);
        const strParamNames = paramNames.join(', ');

        let str = `\n\ndescribe('${name}', () => {
${GAP}test.each(testcases)('${name}($${paramNames.join(', $')}`;
        str += `) = $expected', ({ ${strParamNames}, expected }) => {
${GAP + GAP}expect(${name}(${strParamNames})).toStrictEqual(expected);\n${GAP}});\n});`;

        return str;
};

const constructStringTestFunction = (problemData, filePathSolution) => {
        let str = constructStrTestImports(
                problemData.metadata.name,
                filePathSolution,
        );
        str += constructStrTestTestcases(problemData);
        str += constructStrTestFuncDescribe(problemData);

        return str;
};

export { constructStringTestFunction };
